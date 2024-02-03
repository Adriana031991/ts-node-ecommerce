import express from 'express'
import dbConnect from './config/dbConnect';
import http from 'http';
import { PORT } from './config/config';
import router from './router';
// import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


const app = express()
app.disable('x-powered-by')
// app.use(cors({
//     credentials: true,
// }));

app.use(cookieParser());
app.use(bodyParser.json());
const server = http.createServer(app);

dbConnect();
app.use(express.json());
app.use('/', router());

server.listen(PORT, () => {
    console.log(`✅ SERVER RUNNING ON PORT: ${PORT} 🌟`);
});