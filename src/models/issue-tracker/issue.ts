import * as mongoose from 'mongoose';
import { IssueComment } from './issue-comment';

let Schema = mongoose.Schema;

let issueSchema = new Schema({
  owener: {
    type: Schema.Types.ObjectId,
    ref: 'Issue-Tracker',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Issue-Tracker.tags'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assigned: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
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
  comments: [IssueComment]
});

let Issue = mongoose.model('Issue', issueSchema);

export { Issue };

