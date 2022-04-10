import * as argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from 'next'
import * as db from "./../../server/db"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //Only POST mothod is accepted
  if (req.method === 'POST') {
      //Getting email and password from body
      const {Title, UId, DateOfEvent, Latitude, Longitude, Description} = await req.body;
      //Validate
      if (!Title || !UId || !DateOfEvent || !Latitude || !Longitude || !Description) {
          res.status(422).json({ message: 'Invalid Data' });
          return;
      }

      const status = await db.addPost(UId, Title, DateOfEvent, Latitude, Longitude, Description)
      //Send success response
      res.status(201).json({ message: `Post ${status} created`});
    } else if (req.method === 'GET') {
        const status = await db.getAllPosts();
        return status;
    } else {
      //Response for other than POST method
      res.status(500).json({ message: 'Route not valid' });
  }
}

export default handler;
