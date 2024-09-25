import type { Student } from "@prisma/client";
import type { invited_student_schema, payer_schema, student_schema } from "./validator.js";
import type { UMerge } from "../../utils/types.js";

export type CreatePaymentDTO = UMerge<typeof payer_schema._type, { found_student: Student }>;
export type CreateStudentDTO = typeof student_schema._type;

export type CreateInvitedStudentDTO = UMerge<typeof invited_student_schema._type, { invited_by_id: Student["id"] }>;

export type GetInviteLinkDTO = { found_student: Student };
