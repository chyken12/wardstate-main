import express, { request, response } from 'express'
import Admission from '../models/Admissionmodel.js';

const router = express.Router()


router.get('/:ward', async (request,response) =>{
    try {

      const { ward } = request.params;
      const admissionsbyward = await Admission.find({ward})
      response.json(admissionsbyward)
      
    } catch (error) {
      console.error(error)
      response.status(500).json({message:'error retriving admissions'})
      
    }
  })
  
  export default  router