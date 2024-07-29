import express, { request, response } from 'express'
import {PORT, mongoDBURL} from './config.js'
import mongoose from 'mongoose'
import cors from 'cors'; 


import AdmissionsRoutes from './Routes/AdmissionsRoutes.js'
import DischargesRoutes from './Routes/DischargesRoutes.js'
import  ExpiredRoutes from './Routes/ExpiredRoutes.js'
import transInRoutes from './Routes/transInRoutes.js'
import transOutRoutes  from './Routes/transOutRoutes.js'
import AdmissionbyWard from './Routes/AdmissionbyWardRoutes.js'


const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))


app.get('/', (request,response) => {
  console.log(request)
  return response.status(234).send('daily ward state')
})
app.use('/api/admission',AdmissionsRoutes)
app.use('/api/discharges',DischargesRoutes)
app.use('/api/expired', ExpiredRoutes)
app.use('/api/transin',transInRoutes)
app.use('/api/transout',transOutRoutes)
app.use('/api/admissionbyward',AdmissionbyWard)

mongoose
.connect(mongoDBURL)
.then(() => {
  console.log('App connected to DB')
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}` )
  } )
})
.catch((error) => {
  console.log(error)
})