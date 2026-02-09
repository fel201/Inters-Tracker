import { allowedOrigins } from "./allowedOrigins.ts";
import { routes } from "./router.ts";
import cookieParser from 'cookie-parser';
import http from 'http';
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
export class Server {
  private app: express.Application;
  
  public constructor() {
    this.app = express();
    this.app.use(cookieParser());
    this.app.use(cors( {origin: allowedOrigins, credentials: true} ));
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    routes(this.app);
    // this.app.use((req, res, next) => {
    //     console.log('URL:', req.url);
    //     console.log('Cookie Header:', req.headers.cookie);
    //     console.log('Origin:', req.headers.origin);
    //     next();
    // })
  }
  
  public listen(port: number): void {
    this.app.listen(port, 'localhost', () => {
      console.log(`listening on http://localhost:${port}`);
    })
  }
  
}

const app = new Server;
