import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    cedula: {
      type: String,
      required: [true, "La cédula es obligatoria"],
      unique: true,
      trim: true,
      match: [/^\d+$/, "La cédula solo debe contener números"],
    },
    nombre: {
      type: String,
      required: [true, "El nombre completo es obligatorio"],
      trim: true,
      minlength: [3, "El nombre es demasiado corto"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
