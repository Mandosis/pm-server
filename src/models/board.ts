import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let boardSchema = new Schema({
  project_id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: false
  },
  boards: [{
    created_by: {
      type: Schema.Types.ObjectId,
      required: true
    },
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: false,
      unique: false
    },
    created_at: {
      type: Date,
      required: true,
      default: Date.now
    },

    // Lists
    lists: [{
      title: {
        type: String,
        required: true
      },

      // Cards
      cards: [{
        created_by: {
          type: Schema.Types.ObjectId,
          required: true,
          unique: false
        },
        title: {
          type: String,
          required: true
        },
        created_at: {
          type: Date,
          required: true,
          default: Date.now
        },
        body: {
          type: String,
          required: false
        },

        // Comments
        comments: {
          author_id: {
            type: Schema.Types.ObjectId,
            required: false
          },
          body: {
            type: String,
            required: true
          },
          created_at: {
            type: Date,
            required: true,
            default: Date.now
          },
          edited_at: {
            type: Date,
            required: false
          }
        }

      }]
    }]
  }]
});

let Board = mongoose.model('Board', boardSchema);

export { Board };