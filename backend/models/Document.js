import mongoose from "mongoose";

const documentSchema=mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  content: String
}, { timestamps: true }
)

export default mongoose.model("Document",documentSchema)