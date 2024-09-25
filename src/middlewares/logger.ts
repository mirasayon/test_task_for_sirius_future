import type { NextFunction, Response, Request } from "express";
import { Log } from "../utils/console_log.js";

class DevLogger {
	headers = (req: Request, res: Response, next: NextFunction) => {
		Log.slate(`content-type: ${req.headers["content-type"]}`);
		return next();
	};
	body = (req: Request, res: Response, next: NextFunction) => {
		Log.raw("Body: ", { ...req.body });
		Log.raw("Params: ", { ...req.params });
		Log.raw("Query: ", { ...req.query });
		return next();
	};
}
export const devLogger = new DevLogger();
