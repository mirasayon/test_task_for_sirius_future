import type { z, ZodRawShape } from "zod";
export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function check<T extends ZodRawShape>(_schema: z.ZodObject<T>, data: unknown, params?: Partial<z.ParseParams>) {
	const res = await _schema.safeParseAsync(data, params);
	if (res.success === false) {
		const errors = res.error.issues.map((err) => err.message);
		return {
			success: false,
			errors: errors,
			data: null,
		};
	}
	return {
		errors: null,
		success: true,
		data: res.data,
	};
}
export function capitalizeFirstLetter(str: string): string {
	const low = str.toLowerCase();
	return low.charAt(0).toUpperCase() + low.slice(1);
}
