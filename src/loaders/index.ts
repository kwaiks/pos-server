import express, {Application} from "express";
import dotenv from "dotenv";
import { Model } from "objection";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import useragent from "express-useragent";
import controller from "@/controllers/index";
import knexConfig from "@/config/db/knex";
import "./sendResponse";

export default (app: Application) => {
    dotenv.config();
    Model.knex(knexConfig);
    app.use(useragent.express());
    app.use(cookieParser());
    app.use(helmet());
    app.use(cors());
    if (process.env.NODE_ENV === "development"){
        app.use(morgan("dev"));
    }
    app.use( express.urlencoded({
        extended: true,
        limit: "20mb"
    }));
    app.use( express.json( { limit: "20mb" } ) );
    controller(app);
    app.use(express.static("public"));
    app.get("*", (_req, res) => {
        res.status(404).send("Not Found");
    });
};