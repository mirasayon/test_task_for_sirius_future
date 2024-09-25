import { default as PG } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { dbConnectionUri } from "../configs/server.js";

const pool = new PG.Pool({ connectionString: dbConnectionUri });
const adapter = new PrismaPg(pool);
export function prisma_create_client() {
	const prisma = new PrismaClient({ adapter: adapter });
	return prisma;
}
