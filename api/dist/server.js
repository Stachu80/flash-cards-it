"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 4000;
// Sample JSON data
const sampleData = {
    message: 'Hello, this is your JSON data!',
    items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
    ],
};
// Middleware to parse JSON
app.use(express_1.default.json());
// Route to serve JSON data
app.get('/api/data', (req, res) => {
    res.json(sampleData);
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
