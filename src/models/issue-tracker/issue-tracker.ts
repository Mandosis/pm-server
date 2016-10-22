import * as mongoose from 'mongoose';

import { IssueTag } from './issue-tag';

let Schema = mongoose.Schema;

let issueTrackerSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  tags: [IssueTag],
  issues: [{
    type: Schema.Types.ObjectId,
    ref: 'Issue'
  }]
});

let IssueTracker = mongoose.model('IssueTracker', issueTrackerSchema);

export { IssueTracker }; 