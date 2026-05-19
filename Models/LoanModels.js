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
    dataEmprestimo: {
      type: Date,
      default: Date.now,
    },
    dataPrevistaDevolucao: {
      type: Date,
      default: Date.now+7,
    },
    dataDevolucao: {
      type: Date,
      default: Date.now,
    },
    formaPagamento: {
      type: String,
      trim: true,
      required: true,
    },
    multa: {
      type: Number,
      default: 0
    },
    status: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  {

    collection: "loans",
    timestamps: true,
  }
);

export default mongoose.model("Loan", LoanSchema);