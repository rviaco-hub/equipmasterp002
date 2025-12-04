import express from "express";
import { guardarEvaluacion } from "../controllers/EvaluacionesController.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Backend funcionando correctamente en Render",
        timestamp: new Date().toISOString(),
    });
});

router.post("/", guardarEvaluacion);

export default router;
