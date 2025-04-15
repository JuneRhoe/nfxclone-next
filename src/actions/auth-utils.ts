import 'server-only'

import { createCipheriv, createDecipheriv, createHash } from 'crypto'

const AUTH_KEY = createHash('sha512')
  .update(process.env.AUTH_KEY || '')
  .digest('hex')
  .substring(0, 32)

const AUTH_SECRET = createHash('sha512')
  .update(process.env.AUTH_SECRET || '')
  .digest('hex')
  .substring(0, 16)

export function encryptData(data: string) {
  const cipher = createCipheriv('aes-256-cbc', AUTH_KEY, AUTH_SECRET)

  return Buffer.from(
    cipher.update(data, 'utf8', 'hex') + cipher.final('hex'),
  ).toString('base64')
}

export function decryptData(encryptedData: string) {
  const buff = Buffer.from(encryptedData, 'base64')
  const decipher = createDecipheriv('aes-256-cbc', AUTH_KEY, AUTH_SECRET)

  return (
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8')
  )
}
