import type { AddressInfo } from "node:net";
import { NODE_ENV, serverPort } from "../configs/server.js";
import type { Application } from "express";
import { App } from "../app/server.js";
import { Log } from "../utils/console_log.js";
export function StartServer(application: Application) {
	try {
		const server = application.listen({ port: serverPort });
		const { port: _port } = server.address() as AddressInfo;
		Log.success(`The server is running at: http://localhost:${_port} in ${NODE_ENV} environment`);
	} catch (error) {
		Log.error("Error while starting server: ", error);
		process.exitCode = 1;
	}
}
StartServer(App);
