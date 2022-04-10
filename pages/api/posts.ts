import * as argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from 'next'
import * as db from "./../../server/db"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //Only POST mothod is accepted
  if (req.method === 'POST') {
      //Getting email and password from body
      const {user, password, email} = await req.body;
      //Validate
      if (!user || !email || !email.includes('@') || !password) {
          res.status(422).json({ message: 'Invalid Data' });
          return;
      }

      //Send error response if duplicate user is found
      let userProfile = await db.checkUser(user);
      if (userProfile) {
          res.status(422).json({ message: 'User already exists' });
          return;
      }

      //Hash password
      const status = await db.addUser(user, await argon2.hash(password), email);
      //Send success response
      res.status(201).json({ message: `User ${status} created`});
    } else {
      //Response for other than POST method
      res.status(500).json({ message: 'Route not valid' });
  }
}

export default handler;
