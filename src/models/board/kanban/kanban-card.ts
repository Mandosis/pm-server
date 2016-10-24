import * as mongoose from 'mongoose';

import { KanbanComment } from './kanban-comment';

let Schema = mongoose.Schema;

let kanbanCardSchema = new Schema({
  lane: {
    type: Schema.Types.ObjectId,
    ref: 'Kanban_Board.lanes',
    required: true,
    unique: false
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: false
  },
  comments: [KanbanComment],
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  edited: {
    type: Date,
    required: false
  }

});

let KanbanCard = mongoose.model("Kanban_Card", kanbanCardSchema);

export { KanbanCard }