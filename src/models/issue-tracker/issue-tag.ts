import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let issueTagSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  issues: [{
    type: Schema.Types.ObjectId,
    ref: 'Issue',
    
  }]
});

export { issueTagSchema as IssueTag }