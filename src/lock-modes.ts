export enum LockModes {
  /**
   * @description test mode. Does not actually lock
   */
  NO_LOCK,

  /**
   * @description Use the result from first call in subsequent calls that use the same locked resource
   */
  SHARE_RESULT,
  /**
   * @description Queue calls by the same locked resource key
   */
  QUEUE,

  /**
   * @description Queue calls by the same locked resource key but persistent with redis
   * @requires RedisService
   */
  PERSISTENT_QUEUE,
}
