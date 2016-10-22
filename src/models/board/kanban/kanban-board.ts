import * as mongoose from 'mongoose';

import { KanbanLane } from './kanban-lane';

let Schema = mongoose.Schema;

let kanbanBoardSchema = new Schema({
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
    unique: false
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  lanes: [KanbanLane]
});

let KanbanBoard = mongoose.model('Kanban_Board', kanbanBoardSchema);

export { KanbanBoard }