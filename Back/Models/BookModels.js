import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    autor: {
      type: String,
      required: true,
      //unique: true,
      lowercase: true,
      trim: true,
    },
    categoria: {
      type: String,
      required: true,
      trim: true,
    },
    quantidadedisponivel: {
      type: Number,
      required: true,
      trim: true,
    },
    quantidadetotal: {
      type: Number,
      required: true,
      trim: true,
    },
    ano: {
      type: String,
      required: true,
      trim: true,
    },
    ativo: {
      type: Boolean,
      default: true,
      required: true,

    },
  },

  {
    collection: "books",
    timestamps: true,
  }
);

export default mongoose.model("Book", BookSchema);