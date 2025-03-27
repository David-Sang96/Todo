"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getSingleTodo = exports.getAllTodo = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const createTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const todo = yield todo_1.TODO.create({ title });
        res.status(201).json({ message: "Created sucessfully", todo });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            console.log("Error in todo create controller: ", error);
        }
    }
});
exports.createTodo = createTodo;
const getAllTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.TODO.find().select("-__v");
        res.json({ todos });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            console.log("Error in todo get all controller: ", error);
        }
    }
});
exports.getAllTodo = getAllTodo;
const getSingleTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield todo_1.TODO.findById(id).select("-__v");
        if (!todo) {
            res.json({ messsage: "todo not found" });
            return;
        }
        res.json({ todo });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            console.log("Error in todo get single controller: ", error);
        }
    }
});
exports.getSingleTodo = getSingleTodo;
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const { id } = req.params;
        const todo = yield todo_1.TODO.findByIdAndUpdate(id, { title }, { new: true }).select("-__v");
        res.json({ todo });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            console.log("Error in todo update controller: ", error);
        }
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield todo_1.TODO.findByIdAndDelete(id);
        res.status(500).json({ message: "Deleted sucessfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            console.log("Error in todo delete controller: ", error);
        }
    }
});
exports.deleteTodo = deleteTodo;
