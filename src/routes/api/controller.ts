import type { Request, Response } from "express";
import { ServerError } from "../../utils/errors.js";
import type { CreateInvitedStudentDTO, CreateStudentDTO, GetInviteLinkDTO, CreatePaymentDTO } from "./dto.js";
import type { RequestWithBody } from "src/utils/types.js";
import { service } from "./service.js";
class ApiConroller {
	servise_url: string;
	constructor(route: string) {
		this.servise_url = route;
	}
	getHello = async (req: Request, res: Response) => {
		return res.status(200).json({ url: this.servise_url });
	};
	CreatePayment = async (req: RequestWithBody<CreatePaymentDTO>, res: Response) => {
		try {
			if (!req.dto) {
				return ServerError.default(req, res);
			}
			const new_payment = await service.CreatePayment(req.dto);
			return res.status(200).json({ message: "Successfully created new payment", new_payment });
		} catch (error) {
			return ServerError.default(req, res, error);
		}
	};
	GetReferralStatistics = async (req: Request, res: Response) => {
		try {
			const all_invited_students = await service.GetReferralStatistics();
			return res.status(200).json([...all_invited_students]);
		} catch (error) {
			return ServerError.default(req, res, error);
		}
	};
	GetInviteLink = async (req: RequestWithBody<GetInviteLinkDTO>, res: Response) => {
		try {
			if (!req.dto) {
				return ServerError.default(req, res, "no dto");
			}
			const new_invitation = await service.GetInviteLink(req.dto);
			return res.status(201).json({ message: "Invite created successfully", new_invitation });
		} catch (error) {
			return ServerError.default(req, res, error);
		}
	};

	CreateStudent = async (req: RequestWithBody<CreateStudentDTO>, res: Response) => {
		try {
			if (!req.dto) {
				return ServerError.default(req, res);
			}
			const new_student = await service.CreateStudent(req.dto);
			return res.status(201).json({ message: "Student created successfully", new_student });
		} catch (error) {
			return ServerError.default(req, res, error);
		}
	};

	CreateInvitedStudent = async (req: RequestWithBody<CreateInvitedStudentDTO>, res: Response) => {
		try {
			if (!req.dto) {
				return ServerError.default(req, res);
			}

			const new_user = await service.CreateInvitedStudent(req.dto);
			res.status(201).json({
				message: "Successfully created new invited student",
				new_user,
			});
		} catch (error) {
			return ServerError.default(req, res, error);
		}
	};
}
export const controller = new ApiConroller("/api");
