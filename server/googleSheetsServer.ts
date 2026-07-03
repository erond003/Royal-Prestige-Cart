import express from "express";

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});