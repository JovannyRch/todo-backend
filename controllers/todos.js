const Todo = require("../models/Todo");
const handlerError = require("../helpers/errorBD");



const createTodo = async (req, res) => {

    try {
        const { description } = req.body;
        const { uid } = req;
        if (!description) {
            return res.status(401).json({
                ok: false,
                msg: "Descripion is required"
            });
        }

        const todo = new Todo({ description, user: uid });
        await todo.save();
        return res.status(201).json({
            ok: true,
            msg: "Todo created!",
            data: todo
        });
    } catch (e) {
        handlerError(res, e);
    }
}

const completTodo = async (req, res) => {
    try {
        const { isDone } = req.body;
        const uid = req.params.uid;

        const todo = await Todo.findById(uid);
        if (!todo) {
            return res.status(404).json({
                ok: false,
                msg: "Todo id not found"
            });
        }

        if (todo.user.toString() != req.uid) {
            return res.status(401).json({
                ok: false,
                msg: "Your are not authorized!",
            })
        }


        todo.isDone = isDone;
        const todoUpdated = await Todo.findByIdAndUpdate(uid, todo, { new: true });

        return res.json({
            ok: true,
            msg: "Successfully todo updated",
            data: todoUpdated,
        });
    } catch (e) {
        handlerError(res, e);
    }

}


const allMyTodos = async (req, res) => {

    try {
        const { uid } = req;
        const todos = await Todo.find({ user: uid }).populate('user', 'name');

        return res.json({
            ok: true,
            data: todos
        });
    } catch (e) {
        handlerError(res, e);
    }
}


const deleteTodo = async (req, res) => {

    try {
        const uid = req.params.uid;

        const todo = await Todo.findById(uid);
        if (!uid) {
            return res.status(401).json({
                ok: false,
                msg: "Id is empty",
                uid
            })
        }
        if (!todo) {
            return res.status(401).json({
                ok: false,
                msg: "Todo id not found",
                uid
            })
        }
        if (todo.user.toString() != req.uid) {
            return res.status(401).json({
                ok: false,
                msg: "Your are not authorized!",
            })
        }


        const todoDeleted = await Todo.findByIdAndDelete(uid);
        return res.status(200).json({
            ok: true,
            msg: "Todo deleted",
            data: todoDeleted,
        });
    } catch (e) {
        handlerError(res, e);
    }

}

module.exports = {
    allMyTodos,
    createTodo,
    completTodo,
    deleteTodo,
}