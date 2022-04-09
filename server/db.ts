import * as mysql from "mysql2/promise";
import { FieldPacket, RowDataPacket } from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import { User } from "../types/userTypes";
import { Post } from "../types/postTypes"

export const conPool = mysql.createPool({
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASS'],
    database: process.env['DB_NAME'],
    connectionLimit: 10
  });

export async function addUser(username: string, password: string, email: string) {
  const uid = uuidv4()
  try{
    const results = await conPool.execute(
      "INSERT INTO users (Id, UserName, Password, Email) VALUES (?, ?, ?, ?)",
    [uid, username, password, email]);
    console.log(results)
  }
  catch(e){
    console.error(e)
  }
  return uid;
}

export async function deleteUser(uid: string) {
  try{
    const results = await conPool.execute(
      "DELETE from users WHERE Id = ?",
    [uid]);
    console.log(results)
  }
  catch(e){
    console.error(e)
  }
  return uid; 
}

export async function checkUser(uid: string) {
  let user: User | null = null;
  try{
    const results = (await conPool.execute(
      "Select from users WHERE Id = ?",
      [uid])) as [RowDataPacket[], FieldPacket[]];
    console.log(results)
    user = {
      Email: results[0][0].Email,
      Id: results[0][0].Id,
      Password: results[0][0].Password,
      UserName: results[0][0].UserName
    }
  }
  catch(e){
    console.error(e)
  }
  return user
}

export async function addPost(uid: string, title: string, dateOfEvent: Date, latitude: string, longitude: string, description: string) {
  const id = uuidv4()
  try{
    const results = await conPool.execute(
    "INSERT INTO posts (Id, Title, UId, DateOfEvent, Latitude, Longitude, Description) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, title, uid, dateOfEvent, latitude, longitude, description]);
    console.log(results)
  }
  catch(e){
    console.error(e)
  }
  return id;
}

export async function deletePost(id: string) {
  try{
    const results = await conPool.execute(
      "DELETE from posts WHERE Id = ?",
    [id]);
    console.log(results)
  }
  catch(e){
    console.error(e)
  }
  return id; 
}

export async function checkPost(id: string) {
  let post: Post | null = null;
  try{
    const results = (await conPool.execute(
      "Select from users WHERE Id = ?",
      [id])) as [RowDataPacket[], FieldPacket[]];
    console.log(results)
    post = {
      Id: results[0][0].Id,
      Title: results[0][0].Title,
      UId: results[0][0].UId,
      DateOfEvent: results[0][0].DateOfEvent,
      Latitude: results[0][0].Latitude,
      Longitude: results[0][0].Longitude,
      Description: results[0][0].Description,
    }
  }
  catch(e){
    console.error(e)
  }
  return post
}