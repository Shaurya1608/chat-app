import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import path from 'path';
import { connectDB } from './lib/db.js';
import {ENV} from './lib/env.js';
import cors from 'cors';
import { app, server } from './lib/socket.js';


const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json({limit:"5mb"}));//middleware to parse json body

//CORS configuration to allow requests from frontend or cookies to be sent
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true,
}));

app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


//make ready ffor deployment 

if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (_,res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
  });
}

server.listen(PORT, () => {
  console.log('Server is running on port', PORT);
  connectDB();
});