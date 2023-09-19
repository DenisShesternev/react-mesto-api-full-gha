const { JWT_SECRET = 'JWT_SECRET' } = process.env;
const { MONGODB = 'mongodb://localhost:27017/mestodb' } = process.env;
module.exports = {
  JWT_SECRET,
  MONGODB,
};
