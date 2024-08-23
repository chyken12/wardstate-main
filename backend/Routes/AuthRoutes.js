import express, { request, response } from 'express'
import Admission from '../models/Admissionmodel.js';

const router = express.Router()

router.get('/login', (request, response) => {
  response.send('login')


});

router.post('/login', (request, response) => {
  response.send('signup')


});


router.get('/sigup', (request, response) => {
  response.send('signup')


});

router.post('/sigup', (request, response) => {
  response.send('signup')


});




export default router