import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let boardSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
    unique: true
  },
  boards: [{
    type: Schema.Types.ObjectId,
    ref: 'Kanban_Board'
  }]
});

let Board = mongoose.model('Board', boardSchema);

export { Board };