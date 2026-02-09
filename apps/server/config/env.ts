import dotenv from "dotenv";
import { cleanEnv, str, port } from "envalid";

dotenv.config({ quiet: true });

export const ENV = cleanEnv(process.env, {
  DB_URL: str(),
  JWT_KEY: str(),
});
