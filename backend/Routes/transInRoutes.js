import express, { request, response } from 'express'
import Admission from '../models/Admissionmodel.js';





const router = express.Router()


// Transfer In routes
router.post('/', async (request, response) => {
  const newAdmission = new Admission(request.body);
  newAdmission.status = 'Transferred'; // Update status on transfer in

  try {
    const savedAdmission = await newAdmission.save();
    response.status(201).json({ message: 'Transfer In successful!', admission: savedAdmission });
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: 'Error saving admission' });
  }
});

//route to all trans ins
router.get('/', async (request, response) => {
  try {
    const transin = await Admission.find({ transferInDate: { $exists: true } });
    response.json(transin)
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: 'Error retrieving transfer in data' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters

  try {
    const deletedTransin = await Admission.findByIdAndDelete(id); // Delete by ID
    if (!deletedTransin) {
      return res.status(404).json({ message: ' record not found' });
    }
    res.status(200).json({ message: ' record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting  record' });
  }
});
export default  router