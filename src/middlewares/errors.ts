import type { NextFunction, Request, Response } from "express";
import { ServerError } from "../utils/errors.js";
import { Log } from "../utils/console_log.js";

class UnknownErrorsHandler {
	SyntaxErrorInBody = async (res: Response, error: Error) => {
		return res.status(400).json({
			errors: [`Invalid JSON format. ${error.message}`],
		});
	};
	ErrorAtServer = async (req: Request, res: Response, error: Error) => {
		Log.error(error);
		return ServerError.default(req, res);
	};
	handler = async (error: Error, req: Request, res: Response, next: NextFunction) => {
		if (error instanceof SyntaxError && "body" in error) {
			return this.SyntaxErrorInBody(res, error);
		}
		if (error instanceof Error) {
			return this.ErrorAtServer(req, res, error);
		}
	};
}
export const UnknownErrors = new UnknownErrorsHandler();
