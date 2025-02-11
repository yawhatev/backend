import {Router} from "express";
import authRouter from "./auth.route.js";
import postRouter from "./posts.route.js";
import authentication from "../middlewares/authentication.js";

const router = Router();

router.use("/auth",authRouter);

router.use(authentication);

router.use("/posts",postRouter);
router.patch("/posts",postRouter);
router.delete("/posts",postRouter);

export default router;