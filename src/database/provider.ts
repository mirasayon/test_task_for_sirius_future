import { is_prod } from "../configs/server.js";
import { prisma_create_client } from "./adapter.js";
type prismainstance = ReturnType<typeof prisma_create_client>;
declare global {
	var PrismaClientGlobal: undefined | prismainstance;
}
export const prisma = globalThis.PrismaClientGlobal ?? prisma_create_client();
if (!is_prod) {
	globalThis.PrismaClientGlobal = prisma;
}
