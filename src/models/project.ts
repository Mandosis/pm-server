import * as mongoose from 'mongoose';
const speakingurl = require('speakingurl');

let Schema = mongoose.Schema;

let projectSchema = new Schema({
  url: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  title_lower: {
    type: String,
    unique: true,
    lowercase: true
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
    ref: 'Issue-Tracker',
    required: true,
  },
  created_at: {
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
  project.title_lower = project.title.toLowerCase();
  return next();
});

let Project = mongoose.model('Project', projectSchema);

export { Project };