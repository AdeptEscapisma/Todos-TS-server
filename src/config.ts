import dotenv from 'dotenv'

dotenv.config({ path: __dirname + '/../.env' });

// Конфигурационный файл. Считывает переменные из .env
// Некоторые переменные следует записывать в переменные окружения по соображениям безопасности (секретный ключ, строка подключения к базе данных)

const config = {
    port: process.env.PORT,
    database: process.env.DATABASE,
    secret: process.env.SECRET,
    tokenLifetime: process.env.TOKEN_LIFETIME
};

export default config;