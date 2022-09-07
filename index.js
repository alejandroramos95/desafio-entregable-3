import Contenedor from './Contenedor.js';
import express from 'express';
const app = express();
const PORT = 8080;
const contenedor = new Contenedor("./productos.txt");

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.get("/productos", async (req, res) => {
  const response = await contenedor.getAll();
  res.status(200).json(response);
});

app.get("/productoRandom", async (req, res) => {
  const response = await contenedor.getRandom();
  res.status(200).json(response);
});
