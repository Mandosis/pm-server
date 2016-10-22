import * as mongoose from 'mongoose';

import { IssueSchema } from './issue.schema';

let Schema = mongoose.Schema;

let issueTrackerSchema = new Schema({
  project_id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  issues: [IssueSchema]
});

let IssueTracker = mongoose.model('IssueTracker', issueTrackerSchema);

export { IssueTracker }; 