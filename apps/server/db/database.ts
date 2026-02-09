import { Pool, Client, Query } from "pg";
import { ENV } from "../config/env.ts";
// it's a pool
const connectionString = ENV.DB_URL;
export class Database {
  db: Pool;
  public constructor() {
    this.db = new Pool({ connectionString });
  }
  public async getComments(puuid: string) {
    const query = await this.db.query("SELECT * FROM comments WHERE player_puuid=$1",
      [puuid]
    );
    return query.rows;
  }
  public async addInter(puuid: string) {
    await this.db.query("INSERT INTO inters (puuid) VALUES ($1)", [puuid]);
  }
  public async getInters() {
    const query = await this.db.query("SELECT * FROM inters");
    return query.rows;
  }
  public async addUser(username: string, email: string, password: string) {
    await this.db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, password],
    );
  }
  public async getUserByEmail(email: string) {
    const query = await this.db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return query.rows;
  }
  public async getUserByUsername(username: string) {
    const query = await this.db.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );
    return query.rows;
  }
  public async getInterByPuuid(puuid: string) {
    const query = await this.db.query("SELECT * FROM inters WHERE puuid=$1",
      [puuid]
    );
    return query.rows;
  }
  public async addProfileComment(puuid: string, user_id: string, content: string) {
    const user = await this.db.query('SELECT * FROM users WHERE id=$1',
      [user_id]
    );
    console.log(user.rows);
    console.log(user.rows.length == 0);
    if (user.rows.length == 0) return false;
    const username = user.rows[0].username;
    return await this.db.query('INSERT INTO comments (content, player_puuid, user_id, username) VALUES ($1, $2, $3, $4)',
      [content, puuid, user_id, username]
    );
  }
  end() {
    this.db.end();
  }
}

export const db = new Database();
