import express from 'express';
import { createSession, deleteSession, registerUser } from './controller.ts';

const app = express.Router();

app.delete("/session", deleteSession);
app.post("/session", createSession);
app.post("/users", registerUser);

export default app;