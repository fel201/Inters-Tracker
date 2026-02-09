import { Server } from "./config/config.ts";

const app = new Server;
app.listen(3000);
export default app;