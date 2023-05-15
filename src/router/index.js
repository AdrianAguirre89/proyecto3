import { Router } from "express"
import api_router from './api/index.js'
//import view_router from './views/index.js'

const router = Router ()

router.use('/api',api_router)
//todas las rutas de las api rest van a tenes el endpoint /api
//router.use('/',view_router)


export default router

//enrrutador principal de la aplicacion
// aca se llama de la api y de la vistas