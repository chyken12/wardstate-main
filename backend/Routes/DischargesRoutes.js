import express, { request, response } from 'express'
const router = express.Router()
import Admission from '../models/Admissionmodel.js';



//Route to get all discharges
router.get('/', async (request, response) => {
  try {
    const Discharges = await Admission.find({status:'Discharged'})
    response.json(Discharges)
    
  } catch (error) {
    console.error(error)
    response.status(500).json({message:'error retreiving all discharges'})
    
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters
 

  try {
    const deleteDischarge = await Admission.findByIdAndDelete(id); // Delete by ID
    if (!deleteDischarge) {
      return res.status(404).json({ message: ' record not found' });
    }
    res.status(200).json({ message: ' record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting Admited record' });
  }
});
router.put('/:id', async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters
  const updateData = req.body 

  try {
    const updateDischarge = await Admission.findByIdAndUpdate(id,updateData,{new:true});
    if (!updateDischarge) {
      return res.status(404).json({ message: ' record not found' });
    }
    res.status(200).json({ message: ' record updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error upadating record' });
  }
});
export default  router
