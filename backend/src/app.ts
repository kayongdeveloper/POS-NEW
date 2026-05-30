import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routers from './routes/index.js';

dotenv.config();

const app = express();
// initialize the port number from environment variable or default to 3000
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

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


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});




