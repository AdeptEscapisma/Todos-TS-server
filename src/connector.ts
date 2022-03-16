import mongoose from 'mongoose'
import config from './config'

// Коннектор к базе данных, указанной в .env
// Возвращает объект mongoose для создания моделей данной базы

export class Database {
    public static init(): void {
        mongoose.connect(config.database, function (err: Error) {
            if (err) throw err;
            console.log('Connected to the database.');
        });
    }
}
Database.init();

export default mongoose;
