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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let DB_CONNECTION_STRING = "";
        if (process.env.NODE_ENV === "development") {
            DB_CONNECTION_STRING = process.env.MONGODB_LOCAL_URI;
        }
        if (process.env.NODE_ENV === "production") {
            DB_CONNECTION_STRING = process.env.MONGODB_URI;
        }
        const response = yield mongoose_1.default.connect(DB_CONNECTION_STRING);
        console.log(`DB connected Successsfully. ${response.connection.host}`);
    }
    catch (error) {
        console.log("Error in connection database: ", error);
        process.exit(1);
    }
});
exports.default = connectDB;
