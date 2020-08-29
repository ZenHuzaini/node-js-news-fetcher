const mongoose = require("mongoose");

let isConnected = false;

function connect() {
  if (!isConnected) {
    mongoose.connection.on("connected", () =>
      console.log("connected to database")
    );

    mongoose.connection.on("reconnected", () =>
      console.log("reconnecting database")
    );

    mongoose.connect(process.env.MONGO_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    connected = true;
  }

  return isConnected;
}

function createModel(name, schema) {
  connect();
  return mongoose.model(name, schema);
}

module.exports = { createModel };
