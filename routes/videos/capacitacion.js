import express from "express";
import multer from "multer";

import {
  getVideos,
  addVideo,
  deleteVideo
} from "../../controllers/CapacitacionesController.js";

const router = express.Router();

const upload = multer({ dest: "tempUpload/" });

// ===============================
// GET lista
// ===============================
router.get("/", getVideos);

// ===============================
// POST agregar
// SI viene archivo -> req.file
// SI viene URL -> req.body.url
// ===============================
router.post("/", upload.single("file"), addVideo);

// ===============================
// DELETE eliminar
// ===============================
router.delete("/:id", deleteVideo);

export default router;
