import { Request, Response } from "express";
import { getRepository } from "fireorm";
import { MasterData } from "./db/firebase/firestore/v2/MasterData";
import { getApp } from "./db/firebase/getApp";

getApp()

export const helloWorld = async (req: Request, res: Response) => {
  const masterDataRepository = getRepository(MasterData);
  const master = await masterDataRepository.find()
  const replyMessage = req.body.message || master.length;
  const response = { message: replyMessage };
  res.send(response);
  return response;
};
