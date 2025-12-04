import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    cedula: { //id
      type: String,
      required: [true, "La cédula es obligatoria"],
      unique: true,
      trim: true,
      match: [/^\d+$/, "La cédula solo debe contener números"],
    },
    nombre: { //nombre completo
      type: String,
      required: [true, "El nombre completo es obligatorio"],
      trim: true,
      minlength: [3, "El nombre es demasiado corto"],
    },
    rol: { //admin o no admin
      type: Boolean,
      required: false,
    },
    cargo: { //cargo
      type: String,
      trim: true,
      minlength: [3, "Ingrese un cargo válido"],
    },
    ciudad: { //ciudad
      type: String,
      trim: true,
      minlength: [2, "Ingrese una ciudad válida"],
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
