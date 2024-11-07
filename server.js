const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
