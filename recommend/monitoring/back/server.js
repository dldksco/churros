require('dotenv').config();
const express = require('express');
const connect = require('./db/index')
const logSchema = require('./models/document');

const app = express();

const { PORT } = process.env;
const cors = require("cors");
app.use(
  cors({
    origin: true,
  })
);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function getConnection() {
  try {
    await connect();
    // MongoDB와의 연결이 수립되었으므로, 이후 로직을 작성할 수 있습니다.
  } catch (error) {
    console.log('몽고디비 연결 에러', error);
  }
}

getConnection();

app.get('/error', (req, res) => {
  logSchema.findAllByDate({state: 'ERROR'})
  .then((logs)=>{
    res.send(`find successfully : ${logs}`);
  })
  .catch(err => res.status(500).send(err));
  console.log("들어왓다잉")
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
});