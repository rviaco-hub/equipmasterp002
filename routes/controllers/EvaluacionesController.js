import Evaluacion from "../../models/evaluacion.js";
import User from "../../models/user.js";
import mongoose from "mongoose";

export const guardarEvaluacion = async (req, res) => {
  try {
    const { idUser, cargo, ciudad, puntaje, porcentaje, nota, fecha, tipo } = req.body;

    if (!idUser) {
      return res.status(400).json({ ok: false, msg: "idUser (cedula) es requerido" });
    }

    // 1. buscar usuario por cedula
    const user = await User.findOne({ cedula: idUser });

    if (!user) {
      return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
    }

    // 2. validar máximo 3 evaluaciones al mes
    const inicioMes = new Date();
    inicioMes.setDate(1);
    inicioMes.setHours(0, 0, 0, 0);

    const finMes = new Date();
    finMes.setMonth(finMes.getMonth() + 1);
    finMes.setDate(0);
    finMes.setHours(23, 59, 59, 999);

    const totalEvaluacionesMes = await Evaluacion.countDocuments({
      idUser: user._id,
      fecha: { $gte: inicioMes, $lte: finMes }
    });

    if (totalEvaluacionesMes >= 3) {
      return res.status(403).json({
        ok: false,
        msg: "Ya alcanzó el límite de 3 evaluaciones este mes"
      });
    }

    // 3. guardar evaluación
    const nuevaEva = await Evaluacion.create({
      idUser: user._id,
      cargo,
      ciudad,
      puntaje,
      porcentaje,
      nota,
      fecha,
      tipo
    });

    res.json({
      ok: true,
      msg: "Evaluación registrada con éxito",
      evaluacion: nuevaEva
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error servidor", error });
  }
};
