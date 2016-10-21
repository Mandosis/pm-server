import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  admin_id: [{
    type: Schema.Types.ObjectId,
  }],
  member_id: [{
    type: Schema.Types.ObjectId,
  }],
  wiki_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  board_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
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

let Project = mongoose.model('Project', projectSchema);

export { Project };