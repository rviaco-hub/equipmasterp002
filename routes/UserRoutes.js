import express from "express";
import { registerUser, loginUser } from "../controllers/UserController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json({
    message: "Backend funcionando correctamente en Render",
    timestamp: new Date().toISOString(),
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
