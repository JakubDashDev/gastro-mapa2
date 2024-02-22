import mongoose from 'mongoose';

const connectDB = async () => {
  const DB = process.env.MONGODB.replace(
    '<PASSWORD>',
    process.env.MONGODB_PASSWORD
  );

  try {
    const conn = await mongoose.connect(DB);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB
