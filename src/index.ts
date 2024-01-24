import express from 'express'
import dbConnect from './config/dbConnect';
import http from 'http';
import { PORT } from './config/config';
import router from './router';


const app = express()
app.disable('x-powered-by')
const server = http.createServer(app);

dbConnect();
app.use(express.json());
app.use('/', router());

server.listen(PORT, () => {
    console.log(`✅ SERVER RUNNING ON PORT: ${PORT} 🌟`);
});