const { Schema, model } = require('mongoose');

const TodoSchema = Schema({
    description: {
        type: String,
        require: true
    },
    dueDate: {
        type: Date,
        default: Date.now,
    },
    isDone: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

TodoSchema.method('toJSON', function () {
    const { _id, __v, ...object } = this.toObject();
    object.id = _id
    return object;
});


module.exports = model('Todo', TodoSchema);

