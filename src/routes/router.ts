import { Router } from "express";
import { ApiController } from "./api/router.js";
import { ClientError } from "../utils/errors.js";

export const AppRouter = Router()
	.use("/api", ApiController)
	.get("/", async (_, res) => {
		return res.status(200).json("Hello");
	})
	.all("*", async (_, res) => {
		return ClientError.NotFound(res);
	});
