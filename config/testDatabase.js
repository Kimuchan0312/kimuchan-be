const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

async function startTestDatabase() {
  if (process.env.NODE_ENV === "test") {
    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } else {
    console.error(
      "Error: Trying to connect to the real database in a testing environment."
    );
    process.exit(1); // Exit the process, indicating an error
  }
}

async function stopTestDatabase() {
  if (process.env.NODE_ENV === "test") {
    await mongoose.disconnect();
  }
  // Stop the in-memory server or perform other cleanup
}

module.exports = { startTestDatabase, stopTestDatabase };
