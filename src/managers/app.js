//const fs = require('fs');
import fs from 'fs'

class productManager {
  constructor() {
    this.ArchivoPath = './src/datas/data/Productos.json';
    this.ArchivoProducto = [];
  }
  /*Debe tener un método getProducts, el cual debe leer el archivo de productos 
    y devolver todos los productos en formato de arreglo.
 */
  getProduct() {
    let file = fs.existsSync(this.ArchivoPath);
    if (!file) {
      fs.writeFileSync(this.ArchivoPath, '[]');
      console.log('file created at path: ' + this.ArchivoPath);
      return 'file created at path: ' + this.ArchivoPath;
    } else {
      this.ArchivoProducto = JSON.parse(fs.readFileSync(this.ArchivoPath, 'UTF-8'));
      // console.log(this.ArchivoProducto)
      return this.ArchivoProducto; 
    }
}
  

  /*Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado,
     asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).*/

  addProduct({ title, description, price, thumbnail, stock }) {
    let id = 1;
    if (this.ArchivoProducto.length === 0) {
      id = 1;
    } else {
      let lastProducts = this.ArchivoProducto[this.ArchivoProducto.length - 1];
      id = lastProducts.id + 1;
    }
    let data = { title, description, price, thumbnail, stock, id };
    this.ArchivoProducto.push(data);
    let data_json = JSON.stringify(this.ArchivoProducto, null, 2);
    fs.writeFileSync(this.ArchivoPath, data_json);
  }
  /*Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo,
     debe buscar el producto con el id especificado y devolverlo en formato objeto
 */
  getProductById(id) {
    //console.log('productos:', this.ArchivoProducto);
    let producto = this.ArchivoProducto.find((elemento) => {
      return elemento.id === id;
    });
    if (producto) {
      //console.log(producto)
      return producto;
    } else {
      //console.log('Not found');
    }
  }
  
  /* Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar,
     así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe
      actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
*/
  async update_producto(id, producto_actualizar) {
    try {
      //console.log('LOG 1 ' + producto_actualizar);
      let producto = this.getProductById(id);
      for (let prop in producto_actualizar) {
        console.log("for_prop",producto[prop]);
        producto[prop] = producto_actualizar[prop];
      }
      // this.Products[id] = producto
      let data_json = JSON.stringify(this.ArchivoProducto, null, 2);
      await fs.promises.writeFile(this.ArchivoPath, data_json);
      //console.log('updated productos: ' + id);
      return 'updated productos: ' + id;
    } catch (error) {
      //console.log(error);
      return 'error: updating productos';
    }
  }
  read_productos() {
    console.log('read_productos',this.ArchivoProducto)
    return this.ArchivoProducto
}
  read_producto(id) {
    console.log('read producto', typeof id, id, this.ArchivoProducto);
    let one = this.ArchivoProducto.find(each=>each.id===id)
    //console.log(one)
    return one
    
}
  async deleteProduct(id) {
    try {
      let one = this.getProductById(id);
      if (one) {
        this.ArchivoProducto = this.ArchivoProducto.filter((each) => each.id !== id);
        let data_json = JSON.stringify(this.ArchivoProducto, null, 2);
        await fs.promises.writeFile(this.ArchivoPath, data_json);
        console.log('delete user: ' + id);
        return 'delete user: ' + id;
      }
    } catch (error) {
      //console.log(error);
      return 'error: deleting user';
    }
  }
}



let ticket = new productManager();
ticket.getProduct();
// ticket.read_productos();
// ticket.addProduct({title:"Detergente008",description:"concentrado",price:200,thumbnail:"sin imagen",stock:25});
// ticket.addProduct({title:"escoba",description:"linux",price:120,thumbnail:"sin imagen",stock:50});
// ticket.addProduct({title:"jabon liquido",description:"Ariel",price:800,thumbnail:"sin imagen",stock:125});
// ticket.addProduct({title:"lavandina",description:"ayudin5lts",price:1200,thumbnail:"sin imagen",stock:100});
// ticket.addProduct({title:"desodorante",description:"poet5lst",price:450,thumbnail:"sin imagen",stock:325});
// ticket.addProduct({title:"desengrasante",description:"prosenet",price:500,thumbnail:"sin imagen",stock:225});
// ticket.addProduct({title:"cif",description:"cif",price:200,thumbnail:"sin imagen",stock:325});
// ticket.addProduct({title:"jabon de mano",description:"rexona",price:400,thumbnail:"sin imagen",stock:225});
// ticket.addProduct({title:"dentifrico",description:"colgate",price:800,thumbnail:"sin imagen",stock:325});
// ticket.addProduct({title:"cepillo dental",description:"colgate",price:200,thumbnail:"sin imagen",stock:125});
//ticket.update_producto({title: 'pasta dental',description: 'kolynos',price: 600,thumbnail: 'sin imagen',stock: 225,});
//ticket.deleteProduct();
export default ticket