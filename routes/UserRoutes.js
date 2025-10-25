import express from "express";
import { registerUser, loginUser } from "../controllers/UserController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json({
    message: "Backend funcionando correctamente en Render",
    timestamp: new Date().toISOString(),
  });
});

router.post("/register", async (req, res) => {
  try {
    const { cedula, nombre } = req.body;

    if (!/^\d+$/.test(cedula)) {
      return res.status(400).json({ error: "La cédula debe ser numérica" });
    }

    registerUser
  } catch (error) {
    console.error("Error en /api/usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { cedula } = req.body;
    console.log(cedula);
    

    if (!/^\d+$/.test(cedula)) {
      return res.status(400).json({ error: "La cédula debe ser numérica" });
    }

    loginUser
  } catch (error) {
    console.error("Error en /api/usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


export default router;
