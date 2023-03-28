import * as Cors from 'cors'
import * as express from 'express'
import * as nocache from 'nocache'
import * as functions from 'firebase-functions'
import { getRepository } from "fireorm";
import { MasterData } from "./db/firebase/firestore/v2/MasterData";
import { getApp } from "./db/firebase/getApp";

getApp()

const testRouter = express.Router({ mergeParams: true })
testRouter.get(
  '/',
  async (req, res) => {
    const masterDataRepository = getRepository(MasterData);
    const master = await masterDataRepository.find()
    res.send({ message: master.length })
  }
)

const cors = Cors({ origin: '*' })
const app = express()
app.use(cors)
app.use(nocache())
app.use('/test', testRouter)

export const backendFunction = functions
  .region('us-central1')
  .runWith({
    timeoutSeconds: 80,
    memory: '512MB', // Cold Start measures. It seems good to set it in detail for each function
    minInstances: 1,
  })
  .https.onRequest(app)
