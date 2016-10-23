import * as mongoose from 'mongoose';
import * as winston from 'winston';
const speakingurl = require('speakingurl');

let Schema = mongoose.Schema;

let projectSchema = new Schema({
  url: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }],
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }],
  // wiki: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Wiki',
  //   required: true,
  // },
  // board: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Board',
  //   required: true,
  // },
  issue_tracker: {
    type: Schema.Types.ObjectId,
    ref: 'Issue_Tracker'
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

projectSchema.pre('save', function(next) {
  let project = this;

  if (!project.isModified('title')) {
    return next();
  }

  project.url = speakingurl(project.title);
  return next();
});

let Project = mongoose.model('Project', projectSchema);

export { Project };