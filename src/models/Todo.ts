import mongoose from '../connector';

// Модель задачи. Имеет ID, описание и состояние - задача решена/не решена

export const TodoSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    user: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: Boolean
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;