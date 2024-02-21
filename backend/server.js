import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import { Server } from 'socket.io';

const app = express();

import connectDB from './utils/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import quizRoutes from './routes/quizRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/quiz', quizRoutes);

app.get('/', (req, res) => {
  res.json('Hello from the server');
});

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => console.log('App is running...'));

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

function timer(totalTime, interval) {
  // Pass io and roomId
  let time = totalTime;

  const countdownInterval = setInterval(function () {
    time--;
    io.emit('timerUpdate', time); // Emit to room

    if (time <= 0) {
      // Improved termination
      io.emit('timeEnd', 'Timer ended');
      clearInterval(countdownInterval);
    }
  }, interval);

  console.log('Hello world');
}

io.on('connection', () => {
  console.log('Some client connected, hurray!');
});

timer(30, 1000);
