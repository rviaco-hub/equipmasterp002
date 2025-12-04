import express from "express";
import { userPerfilController, userPerfilByIDController, updateUserPerfilController, deleteUserPerfilController, cleanUsersPerfilController } from "../controllers/UserPerfilController.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.status(200).json({
        message: "Backend funcionando correctamente en Render",
        timestamp: new Date().toISOString(),
    });
});


router.get("/", userPerfilController);
router.get("/:idUser", userPerfilByIDController);
router.post("/:idUser", updateUserPerfilController);
router.post("/:idUser", deleteUserPerfilController);
router.post("/:idUser", cleanUsersPerfilController);


export default router;
