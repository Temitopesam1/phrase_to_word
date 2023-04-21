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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const port = process.env.PORT || 8080; // default port to listen
    app.use(body_parser_1.default.json());
    app.get("/getword/", (req, res) => {
        res.status(200).send("Welcome to the GetWord!");
    });
    const dictAPI = (word) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            return response.data[0].meanings[0].definitions;
        }
        catch (err) {
            return err;
        }
    });
    // Get words by a specific phrase to demonstrate req.params
    // > try it {{host}}/words/:the_phrase
    app.get("/getword/:phrase", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { phrase } = req.params;
        const result = yield dictAPI(phrase);
        res.status(200).json({ 'Result': result });
    }));
    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
