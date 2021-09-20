const { connect: dbConnect } = require("mongoose");
require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;

const app = require("../app");

dbConnect(DB_HOST, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifieldTopology: true,
})
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(() => process.exit(1));
