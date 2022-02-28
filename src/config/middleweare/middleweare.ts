import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import express from "express"
import type { Application } from 'express';

export const mountMiddleweare = (app: Application) => {
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());
};