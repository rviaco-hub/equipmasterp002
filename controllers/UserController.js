import User from "../models/user.js";

// Registrar nuevo usuario
export const registerUser = async (req, res) => {
  const { cedula, nombre } = req.body;

  if (!cedula || !nombre) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }
  
  if (!/^\d+$/.test(cedula)) {
    return res.status(400).json({ message: "La cédula debe contener solo números" });
  }

  try {
    const existingUser = await User.findOne({ cedula });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya está registrado" });
    }

    const newUser = new User({ cedula, nombre });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

// Iniciar sesión
export const loginUser = async (req, res) => {
  const { cedula, nombre } = req.body;

  try {
    const user = await User.findOne({ cedula, nombre });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Inicio de sesión exitoso", user });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};
