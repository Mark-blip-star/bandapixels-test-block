import { Connection, createConnection } from "mongoose";
import { env } from "../env/env.config"

export const connection: Connection = createConnection(env.MONGO_URI);