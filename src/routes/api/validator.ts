import { capitalizeFirstLetter } from "../../utils/functions.js";
import { z } from "zod";

export const create_invitation_schema = z
	.object({
		referrer_id: z
			.string({
				required_error: "referrer_id is required",
				invalid_type_error: "referrer_id must be a string",
			})
			.cuid({ message: "Invalid referrer_id (cuid)" }),
	})
	.required({ referrer_id: true });
export const student_schema = z
	.object({
		phone_number: z
			.string({
				required_error: "phone_number is required",
				invalid_type_error: "Invalid phone number format",
			})
			.refine(
				(val) => {
					const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
					return phoneRegex.test(val);
				},
				{
					message: "Invalid phone number format",
				},
			),
		first_name: z
			.string({ required_error: "first_name is required", invalid_type_error: "first_name must be a number" })
			.trim()
			.min(2)
			.max(20)
			.transform((val) => capitalizeFirstLetter(val)),
		last_name: z
			.string({ required_error: "last_name is required", invalid_type_error: "last_name ID must be a number" })
			.trim()
			.min(2)
			.max(20)
			.transform((val) => capitalizeFirstLetter(val)),
		surname: z
			.string({ required_error: "surname is required", invalid_type_error: "surname ID must be a number" })
			.trim()
			.min(2)
			.max(20)
			.transform((val) => capitalizeFirstLetter(val)),
		email: z
			.string({ required_error: "Email is required", invalid_type_error: "Invalid email address" })
			.trim()
			.email({ message: "Invalid email address" }),
	})
	.required({ email: true, first_name: true, last_name: true, phone_number: true, surname: true });

export const payer_schema = z
	.object({
		student_id: z
			.string({
				required_error: "student_id is required",
				invalid_type_error: "student_id must be a number",
			})
			.cuid({ message: "Invalid student_id" }),
		amount: z
			.number({
				coerce: true,
				required_error: "amount is required",

				invalid_type_error: "amount must be a number",
			})
			.int()
			.positive()
			.safe()
			.finite(),
	})
	.required({ student_id: true, amount: true });

export const invited_student_schema = z
	.object({
		phone_number: z
			.string({
				required_error: "phone_number is required",
				invalid_type_error: "Invalid phone number format",
			})
			.refine(
				(val) => {
					const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
					return phoneRegex.test(val);
				},
				{
					message: "Invalid phone number format",
				},
			),
		referral_link: z
			.string({ required_error: "referral_link is required", invalid_type_error: "Invalid referral_link" })
			.nanoid({ message: "Invalid referral_link (nanoid)" }),
		first_name: z
			.string({ required_error: "first_name is required", invalid_type_error: "first_name must be a number" })
			.trim()
			.min(2)
			.max(20)
			.transform((val) => capitalizeFirstLetter(val)),
		last_name: z
			.string({ required_error: "last_name is required", invalid_type_error: "last_name ID must be a number" })
			.trim()
			.min(2)
			.max(20)
			.transform((val) => capitalizeFirstLetter(val)),
		surname: z
			.string({ required_error: "surname is required", invalid_type_error: "surname ID must be a number" })
			.trim()
			.min(2)
			.max(20)
			.transform((val) => capitalizeFirstLetter(val)),
		email: z
			.string({ required_error: "Email is required", invalid_type_error: "Invalid email address" })
			.trim()
			.email({ message: "Invalid email address" }),
	})
	.required({ email: true, first_name: true, last_name: true, phone_number: true, surname: true, referral_link: true });
