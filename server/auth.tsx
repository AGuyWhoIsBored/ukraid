import * as argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //Only POST mothod is accepted
  if (req.method === 'POST') {
      //Getting email and password from body
      const { user, email, password } = await req.body;
      //Validate
      if (!user || !email || !email.includes('@') || !password) {
          res.status(422).json({ message: 'Invalid Data' });
          return;
      }
      
      //Connect with database
      const db = client.db();
      //Check existing
      const checkExisting = await db
          .collection('users')
          .findOne({ email: email });
      //Send error response if duplicate user is found
      if (checkExisting) {
          res.status(422).json({ message: 'User already exists' });
          client.close();
          return;
      }
      //Hash password
      const status = await db.collection('users').insertOne({
          email,
          password: await argon2.hash(password),
      });
      //Send success response
      res.status(201).json({ message: 'User created', ...status });
      //Close DB connection
      client.close();
  } else {
      //Response for other than POST method
      res.status(500).json({ message: 'Route not valid' });
  }
}

export default handler;
