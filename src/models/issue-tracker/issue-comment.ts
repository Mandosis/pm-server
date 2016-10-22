import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let issueCommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

export { issueCommentSchema as IssueComment };