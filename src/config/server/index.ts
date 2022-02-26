import * as express from "express";
import {env} from "../env/env.config"

import {mountMiddleweare} from '../middleweare/middleweare';
import {mountRouter} from "../../components/router";
const app = express()

mountMiddleweare(app)
mountRouter(app)

const PORT = env.PORT || 5000

app.listen(PORT,() => {
    console.log(`The server is working on port ${PORT}.Database connected`)
})