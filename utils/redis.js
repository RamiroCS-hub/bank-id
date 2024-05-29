import Redis from 'redis';
import dotenv from 'dotenv';
import { ValidationError } from './utils.js';

dotenv.config()

export const useRedis = (key, cb) => {
  return new Promise( async (res, rej) => {
    const redisClient = await Redis.createClient().connect()
      .catch( err => {
        console.error('Ocurrió un error de conexión: ' + err)
        return rej(err)
      })
    const response = await redisClient.get(key)
      .catch( err => {
        console.log(err)
        rej(err)
      })
    console.log(response)
    if(response != null || response != undefined) {
      redisClient.quit()
      return res(JSON.parse(response))
    }
    const result = await cb()
    console.log(result instanceof ValidationError)  
    if(result instanceof ValidationError) {
      redisClient.quit()
      return rej(result.message)
    }
    
    redisClient.set(key, process.env.REDIS_EXPIRATION, JSON.stringify(result))
    redisClient.quit()
    return res(result)
  })
}