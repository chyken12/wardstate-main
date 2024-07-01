import express, { request, response } from 'express'
import Admission from '../models/Admissionmodel.js';





const router = express.Router()



// Transfer Out Route
router.post('/', async (request, response) => {
  const { id, ...transferOutData } = request.body; // Destructure transfer out data

  try {
    const admission = await Admission.findByIdAndUpdate(id, transferOutData, { new: true }); // Update existing admission
    if (!admission) {
      return response.status(404).json({ message: 'Admission not found' });
    }
    response.status(200).json({ message: 'Transfer Out successful!', admission });
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: 'Error updating admission' });
  }
});

// route to all trans outs
router.get('/api/transfer-outs', async (request, response) => {
  try {
    const admissions = await Admission.find({ transferOutDate: { $exists: true } });
    response.status(200).json({ message: 'Transfer Out Data', transferOuts: admissions });
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: 'Error retrieving transfer out data' });
  }
});

router.delete('/api/transfer-outs/:id', async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters

  try {
    const deletedTransferOut = await Admission.findByIdAndDelete(id); // Delete by ID
    if (!deletedTransferOut) {
      return res.status(404).json({ message: 'Transfer Out record not found' });
    }
    res.status(200).json({ message: 'Transfer Out record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting transfer out record' });
  }
});
export default  router