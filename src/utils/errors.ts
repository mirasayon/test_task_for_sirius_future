import type { Response, Request } from "express";
import { Log } from "../utils/console_log.js";
class ClientErrorHandler {
	NotFound = (res: Response) => {
		return res.status(404).json({ errors: ["Not found"] });
	};
	response = (res: Response, statusCode: number, error_list: string[]) => {
		return res.status(statusCode).json({ errors: error_list });
	};
}
export const ClientError = new ClientErrorHandler();
class ServerErrorHandler {
	default = (req: Request, res: Response, error?: unknown, where?: string) => {
		Log.error(`Error at ${req.originalUrl}: `, error);
		return res.status(500).json({ errors: ["Internal server error"] });
	};
	response(res: Response, statusCode: number, error_list: string[]) {
		return res.status(statusCode).json({ errors: error_list });
	}
}
export const ServerError = new ServerErrorHandler();
