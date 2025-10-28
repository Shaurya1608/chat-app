import mongoose from 'mongoose';

export const connectDB =async () => {
    try {
        const {MONGO_URL} = process.env;
        if (!MONGO_URL) throw new Error('MONGO_URL is not defined in environment variables');
    
        const conn =await mongoose.connect(process.env.MONGO_URL,)
        console.log('mongoDB connected:', conn.connection.host);
    } catch (error) {
        console.log('Error in DB connection', error);
        process.exit(1);
    }
}