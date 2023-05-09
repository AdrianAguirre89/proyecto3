import express, { response } from 'express'
import Productos from '../managers/app.js'
import ticket from '../managers/app.js'
import changos from '../managers/carrito.js'

let server = express()

let PORT = 8080
let ready = ()=>console.log('server ready on port: '+PORT)

server.listen(PORT,ready)
server.use(express.urlencoded({extended:true}))

let index_route = '/products'
let index_funtion = (req,res)=>{
    let products = ticket.getProduct()
    if (products){
        return res.send({ 
            success: true,
            products })
    }else{
        'Not found'
    }  
}
server.get(index_route,index_funtion)

let query_route = '/api/products'
let query_funtion = (req,res)=>{
    let quantity = req.query.quantity ?? 5
    let product = ticket.getProduct().slice(0,quantity)
    if(product){
    return res.send({
        success:true,
        product
    })}else{
        'Not found'
    }
}
server.get(query_route,query_funtion)

let one_route = '/api/products/:id'
let one_function = (req,res)=>{
    let parametros = req.params
    let id = Number(parametros.id)
    console.log(parametros);
    let onePROD = ticket.read_producto(id)
    console.log("one_funcion",onePROD);
    if(onePROD){
    return res.send({
        success: true,
        produ: onePROD,

    })}else{
        return res.send({
            success: false,
            produ:{}

        })
    }
}
server.get(one_route,one_function)

let carros_route = '/api/carts'
let carros_funtion = (req,res)=>{
    let carros = ticket.getCart()
    if (carros){
        return res.send({ 
            success: true,
            products })
    }else{
        'Not found'
    }
}
server.get(carros_route,carros_funtion)


let two_route = '/api/carts/:cid'
let two_function = (req,res)=>{
    let parametros = req.params
    let id = Number(parametros.id)
    console.log(parametros);
    let recart = ticket.read_carrito(id)
    //console.log("one_funcion",onePROD);
    if(recart){
    return res.send({
        success: true,
        recart

    })}else{
        return res.send({
            success: false,
            produ:{}

        })
    }
}
server.get(two_route,two_function)

