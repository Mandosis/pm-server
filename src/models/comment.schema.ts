import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let commentSchema = new Schema({
  created_by: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  edited_at: {
    type: Date,
    required: false
  }
});

export { commentSchema as CommentSchema };