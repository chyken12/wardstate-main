import express, { request, response } from 'express'
const router = express.Router()
import Admission from '../models/Admissionmodel.js';


//expired donot have a post request because the add event form has a field for admissionoutcome

//Route to get all Expired
router.get('/', async (request, response) => {
  try {
    const Expired = await Admission.find({status:'Expired'})
    response.json(Expired)
    
  } catch (error) {
    console.error(error)
    response.status(500).json({message:'error retreiving all discharges'})
    
  }
})
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters
 

  try {
    const deleteExpired = await Admission.findByIdAndDelete(id); // Delete by ID
    if (!deleteExpired) {
      return res.status(404).json({ message: ' record not found' });
    }
    res.status(200).json({ message: ' record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting  record' });
  }
});
export default  router