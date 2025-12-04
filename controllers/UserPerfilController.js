import User from "../models/user.js";

// GET /api/perfil/
export const userPerfilController = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error consultando usuarios", error });
  }
};

// GET /api/perfil/:id
export const userPerfilByIDController = async (req, res) => {
  const { idUser } = req.params;

  try {    
    const user = await User.findOne({cedula:idUser});
    console.log("userPerfilByIDController: ", user);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error consultando usuario por ID", error });
  }
};

// POST /api/perfil/:id
// ❗ Nota: esto debería ser PUT, pero respeto tu router
export const updateUserPerfilController = async (req, res) => {
  const { idUser } = req.params;
  const { cargo, ciudad, rol } = req.body;

  try {
    console.log(idUser);
    const user = await User.findOne({cedula:idUser});

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (cargo) user.cargo = cargo;
    if (ciudad) user.ciudad = ciudad;
    if (rol !== undefined) user.rol = rol;

    await user.save();

    res.status(200).json({
      message: "Perfil actualizado correctamente",
      user
    });

  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Error actualizando usuario", error });
  }
};

// POST /api/perfil/:id   (⚠ mismo endpoint que update??)  
export const deleteUserPerfilController = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado correctamente", deletedUser });

  } catch (error) {
    res.status(500).json({ message: "Error eliminando usuario", error });
  }
};

// POST /api/perfil/:id  (😅 esta ruta en realidad no debería tener :id)
// Limpiar TODOS los usuarios en base de datos
export const cleanUsersPerfilController = async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: "Todos los usuarios fueron eliminados" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando usuarios", error });
  }
};
