import { dbInstance } from "@effective-mobile-tt/db/src/index";
import boxen from "boxen";
import express from "express";

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function main() {
  try {
    await dbInstance.connect()
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(
      `\n\n`
      + boxen(
        `🚀 Server running at http://127.0.0.1:${PORT}`,
        { title: 'Server info', padding: 1, borderColor: 'green' }
      )
    );
  });
}

main();
