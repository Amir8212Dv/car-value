import { compareSync } from 'bcrypt'

export const validateHashedPassword = (hash : string , text : string) =>  compareSync(text , hash)
