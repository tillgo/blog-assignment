"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_handlebars_1 = require("express-handlebars");
dotenv_1.default.config();
const app = (0, express_1.default)();
const hbs = (0, express_handlebars_1.create)({
    defaultLayout: "main"
});
app.engine('handlebars', (0, express_handlebars_1.engine)());
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.get('/', (req, res) => {
    res.render('home');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`[server]: Server is listening at port ${port}`);
});
