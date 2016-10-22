import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let kanbanCommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    types: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  edited: {
    type: Date,
    required: false
  }
})

export { kanbanCommentSchema as KanbanComment }