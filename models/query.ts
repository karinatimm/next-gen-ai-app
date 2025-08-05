import mongoose, { Schema, model } from "mongoose";

// So schema is basically what properties we want to
// save when we save the query.
const QuerySchema = new Schema(
  {
    template: {
      type: Object,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    query: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
  },
  // manages two special fields: createdAt, updatedAt
  { timestamps: true }
);

// If the model already exists, use it. If not, create it.
// That way, hot reload won’t crash your app.
const Query = mongoose.models.Query || model("Query", QuerySchema);
export default Query;
