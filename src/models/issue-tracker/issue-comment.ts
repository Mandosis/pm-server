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
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  edited: {
    type: Date,
    required: false
  }
});

export { issueCommentSchema as IssueComment };