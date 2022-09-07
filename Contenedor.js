import fs from "fs";

export default class Contenedor {
  constructor(path) {
    this.path = path;
  }

  async write(item) {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(item, null, 2),
        "utf-8"
      );
    } catch (e) {
      console.log(e);
    }
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(contenido);
    } catch (error) {
      console.log("No existe el archivo.");
    }
  }

  async save(itemNuevo) {
    const contenido = await this.getAll();
    const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
    itemNuevo.id = indice + 1;
    contenido.push(itemNuevo);
    this.write(contenido);
    return itemNuevo.id;
  }

  async getById(id) {
    const items = await this.getAll();
    return items.find((item) => item.id == id);
  }

  async deleteById(id) {
    const items = await this.getAll();
    const itemsEditado = items.filter((item) => item.id != id);
    await this.write(itemsEditado);
  }

  async deleteAll() {
    await this.write([]);
  }

  async getRandom() {
    const items = await this.getAll();
    let indice = Math.floor(Math.random() * items.length);
    return items[indice];
  }
}
