import { nanoid } from "nanoid";
import { prisma } from "../../database/provider.js";
import type { CreateInvitedStudentDTO, CreateStudentDTO, GetInviteLinkDTO, CreatePaymentDTO } from "./dto.js";
import { Log } from "../../utils/console_log.js";
import type { Invitation, Lessons, Payment, Student } from "@prisma/client";
import { get_referral_statistics } from "@prisma/client/sql";
class ApiService {
	private CreateLesson = async (student_id: string): Promise<Lessons> => {
		const new_lesson = await prisma.lessons.create({
			data: {
				student_id: student_id,
			},
		});
		return new_lesson;
	};

	private CreateManyLessons = async (...data: { student_id: string; amount?: number; about?: string }[]) => {
		const new_lesson = await prisma.lessons.createMany({
			data: [...data],
		});
		return new_lesson;
	};
	private generateUniqueInviteLink = async (): Promise<string> => {
		const referal_link = nanoid(21);
		const holy_shit_a_duplicate_really_get_created = await prisma.invitation.findUnique({
			where: {
				invitation_link_id: referal_link,
			},
		});
		if (holy_shit_a_duplicate_really_get_created) {
			return await this.generateUniqueInviteLink();
		}
		return referal_link;
	};
	CreatePayment = async (dto: CreatePaymentDTO): Promise<Payment> => {
		const new_payment = await prisma.payment.create({
			data: {
				payer_id: dto.found_student.id,
				amount: dto.amount,
			},
		});
		return new_payment;
	};
	GetReferralStatistics = async () => {
		const all_invited_students = await prisma.$queryRawTyped(get_referral_statistics());
		// const all_invited_students = await prisma.$queryRaw`SELECT * FROM "Student" WHERE "invitedById" IS NOT NULL;`;
		return all_invited_students;
	};
	GetInviteLink = async (dto: GetInviteLinkDTO): Promise<Invitation> => {
		const referal_link = await this.generateUniqueInviteLink();
		const newReferral = await prisma.invitation.create({
			data: {
				inviter_id: dto.found_student.id,
				invitation_link_id: referal_link,
			},
		});
		return newReferral;
	};

	CreateStudent = async (dto: CreateStudentDTO): Promise<Student> => {
		const new_student = await prisma.student.create({ data: { ...dto } });
		return new_student;
	};

	CreateInvitedStudent = async (dto: CreateInvitedStudentDTO) => {
		Log.slate("CreateInvitedStudent");
		const new_user = await prisma.student.create({
			data: {
				first_name: dto.first_name,
				last_name: dto.last_name,
				surname: dto.surname,
				email: dto.email,
				phone_number: dto.phone_number,
				invited_by_id: dto.invited_by_id,
			},
		});
		const invited_user_id = new_user.id;
		const inviter_user_id = dto.invited_by_id;
		Log.slate("CreateInvitedStudent new_user");

		type TData = Parameters<typeof this.CreateManyLessons>;
		const data_for_inviter: TData = [
			{ student_id: inviter_user_id, about: "Learn C#" },
			{ student_id: inviter_user_id, about: "Learn JavaScript" },
			{ student_id: inviter_user_id, about: "Learn C plus plus" },
			{ student_id: inviter_user_id, about: "Learn Computer Sciense" },
		];
		const data_for_invited: TData = [
			{ student_id: invited_user_id, about: "Learn C#" },
			{ student_id: invited_user_id, about: "Learn JavaScript" },
			{ student_id: invited_user_id, about: "Learn C plus plus" },
			{ student_id: invited_user_id, about: "Learn Computer Sciense" },
		];
		const add_lesson_for_inviter = await this.CreateManyLessons(...data_for_inviter);
		const add_lesson_for_invited_student = await this.CreateManyLessons(...data_for_invited);
		return {
			new_user,
			lessons_for_inviter: add_lesson_for_inviter.count,
			lessons_for_invited: add_lesson_for_invited_student.count,
		};
	};
}
export const service = new ApiService();
