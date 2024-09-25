import { Router } from "express";
import { controller } from "./controller.js";
import { middleware } from "./middleware.js";

export const ApiController = Router()
	.get("/", controller.getHello)
	.post("/referral/generate/", middleware.GetInviteLink, controller.GetInviteLink)
	.get("/statistics/referral/", controller.GetReferralStatistics)
	.post("/student/create/", middleware.CreateStudent, controller.CreateStudent)
	.post("/student/payment/", middleware.Payment, controller.CreatePayment)
	.post("/invite/:referral_link/", middleware.CreateInvitedStudent, controller.CreateInvitedStudent);
