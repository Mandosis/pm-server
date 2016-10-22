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
  }],
  members: [{
    type: Schema.Types.ObjectId,
  }],
  // wiki_id: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  // },
  // board_id: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  // },
  issue_tracker_id: {
    type: Schema.Types.ObjectId,
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