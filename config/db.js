const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;


const connectDatabase = () => {
  if (process.env.NODE_ENV !== 'test') {
    return mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log(`DB connected ${mongoURI}`))
    .catch((err) => console.log(err));
  }
}

module.exports = connectDatabase;