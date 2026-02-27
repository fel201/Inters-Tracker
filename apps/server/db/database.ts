import { Pool } from "pg";
import { ENV } from "../config/env.ts";
// it's a pool
const connectionString = ENV.DB_URL;


const db = new Pool({ connectionString });


export class UserQuery {
  public async add(username: string, email: string, password: string) {
    await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, password],
    );
  }
  public async getByEmail(email: string) {
    const query = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return query.rows;
  }
  public async getByUsername(username: string) {
    const query = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return query.rows;
  }
}

export class ProfileQuery {
  public async getComments(puuid: string) {
    const query = await db.query("SELECT * FROM comments WHERE player_puuid=$1",
      [puuid]
    );
    return query.rows;  
  } 
  public async add(puuid: string) {
    await db.query("INSERT INTO inters (puuid) VALUES ($1)", [puuid]);
  }
  public async getAll() {
    const query = await db.query("SELECT * FROM inters");
    return query.rows;
  }
  public async getByPuuid(puuid: string) {
    const query = await db.query("SELECT * FROM inters WHERE puuid=$1",
      [puuid]
    );
    return query.rows;
  }
  public async addComment(puuid: string, user_id: string, content: string) {
    const user = await db.query('SELECT * FROM users WHERE id=$1',
      [user_id]
    );
    if (user.rows.length == 0) return false;
    const username = user.rows[0].username;
    return await db.query('INSERT INTO comments (content, player_puuid, user_id, username) VALUES ($1, $2, $3, $4)',
      [content, puuid, user_id, username]
    );
  }
}

