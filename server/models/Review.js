import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    authorEmail: { type: String, required: true },
    authorDisplayName: { type: String, default: "" }, // full name to show
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);
