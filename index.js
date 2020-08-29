async function run() {
  const { startServer } = require("./server");
  await startServer(process.env.PORT);
  console.log("server started");
}

run();
