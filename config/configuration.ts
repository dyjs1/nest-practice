import 'dotenv/config';
export default () => ({
  database: {
    host: process.env.DB_HOST_MYSQL || '',
    user: process.env.DB_USER_MYSQL || '',
    name: process.env.DB_DATABASE_MSYSQL || '',
    password: process.env.DB_PASSWORD_MYSQL || '',
    jwt_secret: process.env.JWT_SECRETKEY || '',
  },
});
