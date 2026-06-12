import type { Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routers from './routes/index.js';
import morgan, { type StreamOptions } from 'morgan';
import logger from './config/logger.js';

dotenv.config();

const app = express();
// initialize the port number from environment variable or default to 3000
const PORT = process.env.PORT || 3001;
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const stream:StreamOptions = {
  write: (message:string) => logger.info(message.trim()),
};


app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream }));

app.use('/api', routers);
app.get('/up', (req: Request, res: Response) => {

  const startTime = process.hrtime();


  const diff = process.hrtime(startTime);


  const responseTimeInMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
  res.json({
    status: 'success',
    message: 'Application is health',
    responseTime: `${responseTimeInMs}ms`
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
   logger.info(`TypeScript server running on port : http://localhost:${PORT}`);
});




