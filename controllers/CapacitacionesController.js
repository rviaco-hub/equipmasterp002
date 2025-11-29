import fs from "fs";

const API_VIDEO_SERVER = "https://serverfreevideo.vercel.app/" // http://localhost:3000/videos";

// ===============================
// GET – lista de videos
// ===============================
export const getVideos = async (req, res) => {
  try {
    const response = await fetch(API_VIDEO_SERVER);
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "Error obteniendo videos" });
  }
};

// ===============================
// POST – agregar video
// ===============================
export const addVideo = async (req, res) => {
  try {
    const { titulo, descripcion = "", url } = req.body;

    // ✔ FormData nativo de Node
    const formData = new FormData();
    formData.append("title", titulo);
    formData.append("description", descripcion);

    // Si envían solo URL
    if (url) {
      formData.append("url", url);
    }

    // Si viene archivo
    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);
      formData.append("file", new Blob([fileBuffer]), req.file.originalname);
    }

    const response = await fetch(API_VIDEO_SERVER, {
      method: "POST",
      body: formData,
    });

    if (req.file) fs.unlinkSync(req.file.path);

    const result = await response.json();
    return res.json(result);

  } catch (error) {
    console.error("❗addVideo error:", error);
    return res.status(500).json({ message: "Error al agregar video" });
  }
};

// ===============================
// PUT – actualizar metadata o archivo
// ===============================
export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;

    const formData = new FormData();
    if (titulo) formData.append("title", titulo);
    if (descripcion) formData.append("description", descripcion);

    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);
      formData.append("file", new Blob([fileBuffer]), req.file.originalname);
    }

    const response = await fetch(`${API_VIDEO_SERVER}/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (req.file) fs.unlinkSync(req.file.path);

    const data = await response.json();
    return res.json(data);

  } catch (error) {
    console.error("❗updateVideo error:", error);
    return res.status(500).json({ message: "Error al actualizar video" });
  }
};

// ===============================
// DELETE – eliminar video
// ===============================
export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await fetch(`${API_VIDEO_SERVER}/${id}`, { method: "DELETE" });
    return res.json({ message: "Video eliminado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar video" });
  }
};
