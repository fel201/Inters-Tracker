import express from 'express';
import { addProfileComment, getInters, getProfileComments } from './controller.ts';

const app = express.Router();

app.get("/inters", getInters);
app.get("/inters/:puuid/comments", getProfileComments);
app.post("/inters/:puuid/comments", addProfileComment);

export default app;