import mongoose from "mongoose";

const EpisodeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Episode title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Episode must belong to a project"],
    },
    source: {
      type: String,
      enum: ["RSS", "YouTube", "Manual"],
      default: "Manual",
    },
    sourceUrl: {
      type: String,
      default: "",
    },
    transcript: {
      type: String,
      default: "",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Episode must belong to a user"],
    },
  },
  { timestamps: true }
);

EpisodeSchema.post("save", async function () {
  await mongoose
    .model("Project")
    .findByIdAndUpdate(this.project, { lastEdited: new Date() });
});

export default mongoose.model("Episode", EpisodeSchema);
