import Redis from 'redis';
import dotenv from 'dotenv';
import { ValidationError } from './utils.js';

dotenv.config()

export const useRedis = (key, cb) => {
  return new Promise( async (res, rej) => {
    const redisClient = await Redis.createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
          host: process.env.REDIS_HOSTNAME,
          port: process.env.REDIS_PORT
      }
    }).connect()
      .catch( err => {
        console.error('Ocurrió un error de conexión: ' + err)
        return rej(err)
      })
    const response = await redisClient.get(key)
      .catch( err => {
        console.log(err)
        rej(err)
      })
    if(response != null || response != undefined) {
      redisClient.quit()
      return res(JSON.parse(response))
    }
    const result = await cb()
    console.log('Transactions son:', result)  
    if(result instanceof ValidationError) {
      redisClient.quit()
      return rej(result.message)
    }
    
    redisClient.set(key, JSON.stringify(result), {EX: process.env.REDIS_EXPIRATION})
    redisClient.quit()
    return res(result)
  })
}