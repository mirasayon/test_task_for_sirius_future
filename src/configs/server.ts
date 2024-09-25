const Env = process.env;
export const serverPort = Number(Env.PORT) || 5000;
export const NODE_ENV = Env.NODE_ENV as "development" | "test" | "production";

export const is_dev = NODE_ENV === "development";
export const is_prod = NODE_ENV === "production";
export const is_test = NODE_ENV === "test";

export const dbConnectionUri = Env.DB_CONNECTION_URI as string;
