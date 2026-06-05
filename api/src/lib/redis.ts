import Redis from 'ioredis';
import ENV from '../validators/env.validator'

const redis = new Redis(ENV.REDIS_URL);

export default redis;