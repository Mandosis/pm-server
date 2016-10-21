import * as mongoose from 'mongoose';
import { CommentSchema } from './comment.schema';

let Schema = mongoose.Schema;

let issueSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  created_by: {
    type: Schema.Types.ObjectId,
    required: true
  },
  assigned_to: [{
    type: Schema.Types.ObjectId,
    required: true
  }],
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  },
  edited_at: {
    type: Date,
    required: false
  },
  comments: CommentSchema
});

export { issueSchema as IssueSchema };

