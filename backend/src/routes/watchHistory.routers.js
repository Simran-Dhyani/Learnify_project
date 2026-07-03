import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addToWatchHistory,
    getWatchHistory,
} from "../controllers/watchHistory.controller.js";

const router = Router();

router.route("/")
    .post(verifyJWT, addToWatchHistory)
    .get(verifyJWT, getWatchHistory);

export default router;