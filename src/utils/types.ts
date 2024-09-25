export type UMerge<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] } & B extends infer O ? { [K in keyof O]: O[K] } : never;
import type { Request } from "express";

export type RequestWithBody<T> = Request & { dto?: T };
