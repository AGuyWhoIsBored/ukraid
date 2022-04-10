import type { NextApiRequest, NextApiResponse } from "next";
import * as db from "./../../server/db";
import { v4 as uuidv4 } from "uuid";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    const { Id, Title, UId, DateOfEvent, Latitude, Longitude, Description } =
      await req.body;

    console.log(
      "data",
      Title,
      UId,
      DateOfEvent,
      Latitude,
      Longitude,
      Description
    );

    //Validate
    if (
      !Id ||
      !Title ||
      !UId ||
      !DateOfEvent ||
      !Latitude ||
      !Longitude ||
      !Description
    ) {
      res.status(422).json({ message: "Invalid Data" });
      return;
    }
    const status = await db.addPost(
      Id,
      UId,
      Title,
      DateOfEvent,
      Latitude,
      Longitude,
      Description
    );
    //Send success response
    res.status(201).json({ message: `Post ${status} created` });
  } else if (req.method === "GET") {
    const status = await db.getAllPosts();
    // send success response
    res.status(200).json(status);
  } else if (req.method === "DELETE") {
    console.log("deleting post with ID", req.query.eventID);
    const status = await db.deletePost(req.query.eventID);

    res.status(200).json(status);
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}

export default handler;
