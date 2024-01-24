
import mongoose from 'mongoose';
import { MONGO_URI } from './config';

mongoose.Promise = Promise;

const dbConnect = async () => {
    mongoose
        .connect(MONGO_URI).then(resp => {
            console.log(`Connected to db: ${resp.connections[0].name}`)

        })
        .catch(error => console.log("Connection failed!", error));

}

export default dbConnect