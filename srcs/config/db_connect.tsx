import mongoose from 'mongoose';

const db_connect = async (url: string): Promise<void> => {
    if (url === '') {
        console.log('Error: DB url environment not found\ncheck in connect url');
        return;
    }
    await mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('DB connect success'))
        .catch((err) => console.log(err));
};

export default db_connect;
