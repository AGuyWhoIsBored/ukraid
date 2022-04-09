import * as mysql from "mysql2";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const conPool = mysql.createPool({
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASS'],
    database: process.env['DB_NAME'],
    connectionLimit: 10
  });

export async function addUser(username: string, password: string) {
  const uid = uuidv4()
  await conPool.execute(
    "INSERT INTO users (Id, UserName, Password) VALUES (?, ?, ?)",
  [uid, username, password],
  function(err, results) {
    if (err) {
      console.log(err)
    }
    else {
      console.log(results);
    }
  }
  )
}

