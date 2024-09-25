import type { NextFunction, Response } from "express";
import { prisma } from "../../database/provider.js";
import { invited_student_schema, payer_schema, create_invitation_schema, student_schema } from "./validator.js";
import { check } from "../../utils/functions.js";
import { ClientError, ServerError } from "../../utils/errors.js";
import type { CreateInvitedStudentDTO, CreateStudentDTO, GetInviteLinkDTO, CreatePaymentDTO } from "./dto.js";
import type { RequestWithBody } from "../../utils/types.js";
class ApiMiddlewares {
	Payment = async (req: RequestWithBody<CreatePaymentDTO>, res: Response, next: NextFunction) => {
		try {
			const zod = await check(payer_schema, req.body);
			if ((zod.errors !== null && !zod.success) || !zod.data) {
				return ClientError.response(res, 404, zod.errors);
			}
			const payment_data = zod.data;
			const found_student = await prisma.student.findUnique({ where: { id: payment_data.student_id } });
			if (!found_student) {
				return ClientError.response(res, 404, ["Student with this ID does not exist"]);
			}
			req.dto = { ...payment_data, found_student };
			return next();
		} catch (error) {
			return ServerError.default(req, res, error, "GetInviteLink middleware");
		}
	};
	GetInviteLink = async (req: RequestWithBody<GetInviteLinkDTO>, res: Response, next: NextFunction) => {
		try {
			const invite_data = await check(create_invitation_schema, { referrer_id: req.body.referrer_id });
			if ((invite_data.errors !== null && !invite_data.success) || !invite_data.data) {
				return ClientError.response(res, 400, invite_data.errors);
			}
			const user_id = invite_data.data.referrer_id;
			const found_student = await prisma.student.findUnique({ where: { id: user_id } });
			if (found_student === null) {
				return ClientError.response(res, 400, ["Student with this ID does not exist"]);
			}
			req.dto = { found_student };
			return next();
		} catch (error) {
			return ServerError.default(req, res, error, "GetInviteLink middleware");
		}
	};

	CreateStudent = async (req: RequestWithBody<CreateStudentDTO>, res: Response, next: NextFunction) => {
		try {
			const body = await check(student_schema, req.body);
			if ((body.errors !== null && !body.success) || !body.data) {
				return ClientError.response(res, 400, body.errors);
			}
			const existed_user_by_email = await prisma.student.findUnique({
				where: {
					email: body.data.email,
				},
			});
			if (existed_user_by_email) {
				return ClientError.response(res, 409, ["Student with this Email already exist"]);
			}
			const existed_user_by_phone_number = await prisma.student.findUnique({ where: { phone_number: body.data.phone_number } });
			if (existed_user_by_phone_number) {
				return ClientError.response(res, 409, ["Student with this phone number already exist"]);
			}
			req.dto = { ...body.data };
			return next();
		} catch (error) {
			return ServerError.default(req, res, error, "CreateStudent middleware");
		}
	};

	CreateInvitedStudent = async (req: RequestWithBody<CreateInvitedStudentDTO>, res: Response, next: NextFunction) => {
		try {
			const body = await check(invited_student_schema, {
				referral_link: req.params.referral_link,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				surname: req.body.surname,
				email: req.body.email,
				phone_number: req.body.phone_number,
			});
			if ((body.errors !== null && !body.success) || !body.data) {
				return ClientError.response(res, 400, body.errors);
			}
			const existed_user_by_email = await prisma.student.findUnique({
				where: {
					email: body.data.email,
				},
			});
			if (existed_user_by_email) {
				return ClientError.response(res, 409, ["Student with this Email already exist"]);
			}
			const existed_user_by_phone_number = await prisma.student.findUnique({ where: { phone_number: body.data.phone_number } });
			if (existed_user_by_phone_number) {
				return ClientError.response(res, 409, ["Student with this phone number already exist"]);
			}
			const does_exist_this_referral_link = await prisma.invitation.findUnique({
				where: {
					invitation_link_id: body.data.referral_link,
				},
			});
			if (!does_exist_this_referral_link) {
				return ClientError.response(res, 404, ["Referral link does not exist"]);
			}
			req.dto = { ...body.data, invited_by_id: does_exist_this_referral_link.inviter_id };
			return next();
		} catch (error) {
			return ServerError.default(req, res, error, "CreateStudent middleware");
		}
	};
}
export const middleware = new ApiMiddlewares();
