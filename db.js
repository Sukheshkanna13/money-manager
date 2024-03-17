// db.js

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expenseTracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Define Mongoose models
const expenseSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    // Add more fields as needed
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
