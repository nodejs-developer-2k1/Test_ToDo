import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors'
import formData from 'express-form-data';
import { workRouter ,userRouter} from './Routes/index.js';
import cookieParser from 'cookie-parser';

const app = express()
const port = process.env.PORT || 3000;
const DB_URL = `mongodb://localhost:27017/ToDo`;

app.use(cookieParser());
app.use(formData.parse());
app.use(cors());
app.use('/api/work',workRouter)
app.use('/api/user',userRouter)

mongoose
    .connect(DB_URL)
    .then(() => console.log('DB Connected!'))
    .catch((error) => console.log('DB connection error:', error.message));

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`)
})