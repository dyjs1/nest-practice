import 'dotenv/config';
export default () => ({
  database: {
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    name: process.env.DB_DATABASE || '',
    password: process.env.DB_PASSWORD || '',
    jwt_secret: process.env.JWT_SECRETKEY || '',
  },
});
