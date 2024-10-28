import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
    if (!MONGODB_URI) {
        console.error('MONGODB_URI is not defined. Please check your .env file.');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};
