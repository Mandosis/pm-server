import * as mongoose from 'mongoose';
import { IssueComment } from './issue-comment';

let Schema = mongoose.Schema;

let issueSchema = new Schema({
  issue_tracker: {
    type: Schema.Types.ObjectId,
    ref: 'Issue_Tracker',
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
    ref: 'Issue_Tracker.tags'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignees: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  edited: {
    type: Date,
    required: false
  },
  comments: [IssueComment]
});

let Issue = mongoose.model('Issue', issueSchema);

export { Issue };

