require('dotenv').config();
const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

const connect = async () => {
    try {
      await mongoose.connect('MONGO_URI', {
        dbName: 'newsdb',
        useNewUrlParser: true,
        userCreateIndex: true,
      });
      console.log('몽고디비 연결 성공');
    } catch (error) {
      console.log('몽고디비 연결 에러', error);
    }
  };
  

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다');
  connect();
});

module.exports = connect;