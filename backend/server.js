import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'; // Import the user routes

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json()); // Middleware to parse JSON

// Use user routes
app.use('/', userRoutes); // Ensure the router is used correctly

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
}

main().catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
