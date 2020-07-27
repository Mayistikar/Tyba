import { getManager } from 'typeorm';
import { User } from '../entity/User';
const crypto = require('crypto');

export const auth = (secret: String) => {
  const hash = crypto.createHmac('sha256', secret)
                    .update(process.env.LOCAL_KEY)
                    .digest('hex');
  return hash;
};

export const authorizedToken = async (token) => {
  
  const userRepo = getManager().getRepository(User);

  const user = await userRepo
    .createQueryBuilder("User")
    .where("User.token = :token", { token })
    .getOne();

  return !!user;
};