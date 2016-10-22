import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let issueTrackerSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  issues: [{
    type: Schema.Types.ObjectId,
    ref: 'Issue'
  }]
});

let IssueTracker = mongoose.model('IssueTracker', issueTrackerSchema);

export { IssueTracker }; 