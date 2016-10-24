import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let kanbanLaneSchema = new Schema({
  kanban_board: {
    type: Schema.Types.ObjectId,
    ref: 'Kanban_Board',
    required: true,
    unique: false
  },
  tile: {
    type: String,
    required: true,
  },
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Kanban_Card'
  }]
});

export { kanbanLaneSchema as KanbanLane }