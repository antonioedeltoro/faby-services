// server/models/News.js
import mongoose from "mongoose";
import slugify from "slugify";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

/**
 * Automatically generate / update the slug whenever
 * the title is created or modified.
 */
newsSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }
  next();
});

export default mongoose.model("News", newsSchema);
