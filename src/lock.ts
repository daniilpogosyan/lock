import { randomUUID } from 'crypto';
import { LockModes } from './lock-modes';

/**
 *
 * @param getResourceKey callback, that create key for the locked resource, based on the function parameters. If lockBy returns `null`, result won't be shared.
 * @param mode mode of locking
 *
 */
export function Lock<T extends (...args: any[]) => Promise<any>>(
  getResourceKey: (...args: Parameters<T>) => string | number | null,
  mode: LockModes,
) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    const locks: { [lockedResourceKey: string]: Promise<any> } = {};
    const buildLockKey = (keyValue: number | string) => [target.constructor.name, methodName, keyValue].join(':');

    switch (mode) {
      case LockModes.SHARE_RESULT:
        descriptor.value = function (...args: Parameters<T>) {
          const resourceKey = getResourceKey(...args) ?? randomUUID();
          const lockedResourceKey = buildLockKey(resourceKey);

          if (!locks[lockedResourceKey]) {
            locks[lockedResourceKey] = new Promise((resolve, reject) => {
              method
                .apply(this, args)
                .then((result: any) => {
                  delete locks[lockedResourceKey];
                  resolve(result);
                })
                .catch((error: Error) => {
                  delete locks[lockedResourceKey];
                  reject(error);
                });
            });
          }

          return locks[lockedResourceKey];
        };
        break;

      case LockModes.QUEUE:
        descriptor.value = function (...args: Parameters<T>) {
          const resourceKey = getResourceKey(...args) ?? randomUUID();
          const lockedResourceKey = buildLockKey(resourceKey);

          locks[lockedResourceKey] ??= Promise.resolve(null);

          const newLastPromise = locks[lockedResourceKey].catch(() => undefined).then(() => method.apply(this, args));

          locks[lockedResourceKey] = newLastPromise;

          newLastPromise
            .catch(() => undefined)
            .then(() => {
              if (newLastPromise === locks[lockedResourceKey]) {
                delete locks[lockedResourceKey];
              }
            });

          return newLastPromise;
        };
        break;

      case LockModes.NO_LOCK:
        break;

      default:
        throw new Error('Unknown mode');
    }
  };
}
