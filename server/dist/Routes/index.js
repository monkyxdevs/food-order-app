"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const food_1 = require("./food");
const mainRouter = express_1.default.Router();
mainRouter.use("/user", user_1.default);
mainRouter.use("/food", food_1.foodRouter);
exports.default = mainRouter;
