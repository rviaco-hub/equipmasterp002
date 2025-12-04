import mongoose from "mongoose";

const evaluacionSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cargo: String,
    ciudad: String,
    puntaje: Number,
    porcentaje: Number,
    nota: Number,
    fecha: {
      type: Date,
      default: Date.now
    },
    tipo: { 
      type: String,
      required: true
    }, // ejemplo: "PrimerosAuxilios", "Incendios", "Bioseguridad"
  },
  { timestamps: true }
);

const Evaluacion = mongoose.model("Evaluacion", evaluacionSchema);
export default Evaluacion;
