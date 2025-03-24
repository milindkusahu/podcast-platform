import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot be more than 500 characters"],
      default: "",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Project must belong to a user"],
    },
    lastEdited: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProjectSchema.virtual("episodeCount", {
  ref: "Episode",
  localField: "_id",
  foreignField: "project",
  count: true,
});

export default mongoose.model("Project", ProjectSchema);
