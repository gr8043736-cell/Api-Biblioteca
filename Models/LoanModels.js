import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    dataEmpréstimo: {
      type: Date,
      default: Date.now,
    },
    dataPrevistaDevolução: {
      type: Date,
      default: Date.now,
    },
    dataDevolução: {
      type: Date,
      default: Date.now,
    },
    formaPagamento: {
      type: String,
      trim: true,
      required: true,
    },
    multa: {
      type: String,
      enum: ["nenhuma", "pendente", "paga"],
      default: "nenhuma",

      status: {
        type: String,
        enum: ["pendente", "paga", "cancelada"],
        default: "paga",
      },
    },
  },
  {

    collection: "loans",
    timestamps: true,
  }
);

export default mongoose.model("Loan", LoanSchema);