import { Router } from "express"
import products_router from './products.js'
import carrito_router from './carritos.js'

const router = Router ()

router.use('/products',products_router)
router.use('/carritos',carrito_router)


export default router









