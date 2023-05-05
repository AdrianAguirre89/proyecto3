//const fs = require('fs');
import fs from 'fs'

class CartManager {
  constructor() {
    this.ArchivoPath = './dato/Carritos.json';
    this.ArchivoCarrito = [];
  }
  
  getCarts() {
    let file = fs.existsSync(this.ArchivoPath);
    if (!file) {
      fs.writeFileSync(this.ArchivoPath, '[]');
      console.log('file created at path: ' + this.ArchivoPath);
      return 'file created at path: ' + this.ArchivoPath;
    } else {
      this.ArchivoCarrito = JSON.parse(fs.readFileSync(this.ArchivoPath, 'UTF-8'));
      // console.log(this.ArchivoProducto)
      return this.ArchivoCarrito; 
    }
}
  
  addCart({ title, description, price, thumbnail, stock }) {
    let id = 1;
    if (this.ArchivoCarrito.length === 0) {
      id = 1;
    } else {
      let lastProducts = this.ArchivoCarrito[this.ArchivoCarrito.length - 1];
      id = lastProducts.id + 1;
    }
    let data = { title, description, price, thumbnail, stock, id };
    this.ArchivoCarrito.push(data);
    let data_json = JSON.stringify(this.ArchivoCarrito, null, 2);
    fs.writeFileSync(this.ArchivoPath, data_json);
  }

  getCartById(id) {
    let producto = this.ArchivoCarrito.find((elemento) => {
      return elemento.id === id;
    });
    if (producto) {
      //console.log(producto)
      return producto;
    } else {
      console.log('Not found');
    }
  }
  
  read_carritos() {
    return this.ArchivoCarrito
}
  read_carrito(id) {
    console.log('read producto', typeof id, id, this.ArchivoCarrito);
    let one = this.ArchivoCarrito.find(each=>each.id===id)
    return one
    
}
}



let changos = new CartManager();
changos.getCarts();
// changos.read_carritos();
// changos.addCart({title:"Detergente008",description:"concentrado",price:200,thumbnail:"sin imagen",stock:25});
// changos.addCart({title:"escoba",description:"linux",price:120,thumbnail:"sin imagen",stock:50});
// changos.addCart({title:"jabon liquido",description:"Ariel",price:800,thumbnail:"sin imagen",stock:125});
// changos.addCart({title:"lavandina",description:"ayudin5lts",price:1200,thumbnail:"sin imagen",stock:100});
// changos.addCart({title:"desodorante",description:"poet5lst",price:450,thumbnail:"sin imagen",stock:325});
// changos.addCart({title:"desengrasante",description:"prosenet",price:500,thumbnail:"sin imagen",stock:225});
// changos.addCart({title:"cif",description:"cif",price:200,thumbnail:"sin imagen",stock:325});
// changos.addCart({title:"jabon de mano",description:"rexona",price:400,thumbnail:"sin imagen",stock:225});
// changos.addCart({title:"dentifrico",description:"colgate",price:800,thumbnail:"sin imagen",stock:325});
// changos.addCart({title:"cepillo dental",description:"colgate",price:200,thumbnail:"sin imagen",stock:125});

export default changos