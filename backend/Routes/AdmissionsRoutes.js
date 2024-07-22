
import express, { request, response } from 'express'
import Admission from '../models/Admissionmodel.js';


  const router = express.Router()

// Route for saving a new Admission
router.post('/', async (request, response) => {
try {
  // Parse date strings into Date objects
  const { admissionDate, transferInDate, transferOutDate } = request.body;
  const parsedAdmissionDate = admissionDate ? new Date(admissionDate) : null;
  const parsedTransferInDate = transferInDate ? new Date(transferInDate) : null;
  const parsedTransferOutDate = transferOutDate ? new Date(transferOutDate) : null;

  const newAdmission = new Admission({
    ...request.body,
    admissionDate: parsedAdmissionDate,
    transferInDate: parsedTransferInDate,
    transferOutDate: parsedTransferOutDate,
  });

  // Update status based on transfer dates
  if (parsedTransferOutDate) {
    newAdmission.status = 'TransferedOut';
    console.log('Status set to TransferedOut');
  }

  if (parsedTransferInDate) {
    newAdmission.status = 'TransferIn';
    console.log('Status set to TransferIn');
  }

  // Transfer validation
  const errors = [];
  if (parsedTransferInDate && parsedAdmissionDate) {
    if (parsedTransferInDate < parsedAdmissionDate) {
      errors.push('Transfer In Date cannot be before Admission Date');
    }
  }
  if (parsedTransferOutDate && parsedAdmissionDate) {
    if (parsedTransferOutDate < parsedAdmissionDate) {
      errors.push('Transfer Out Date cannot be before Admission Date');
    }
  }

  if (errors.length > 0) {
    return response.status(400).json({ message: 'Validation errors', errors });
  }

  const savedAdmission = await newAdmission.save();
  response.status(201).json({ message: 'Admission successful!', admission: savedAdmission });
} catch (error) {
  console.log(error.message);
  response.status(500).json({ message: 'Error saving admission' });
}
});

//this two are different
//route for getting all admissions
router.get('/', async (request,response) =>{
  try {
    const admissions = await Admission.find()
    response.json(admissions)

    
  } catch (error) {
    console.error(error)
    response.status(500).json({message:'error retriving admissions'})
    
  }
})
//Route for getting all admitted cases
router.get('/admitted', async (request,response) => {
  try {
    const Admitted = await Admission.find({status:'Admitted'}) 
    response.json(Admitted)
  } catch (error) {
    console.error(error)
    response.status(500).json({message:'error retrieving all admitted cases'})
    
  }
})
//route to delete an admitted case
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters

  try {
    const deletedAdmitted = await Admission.findByIdAndDelete(id); // Delete by ID
    if (!deletedAdmitted) {
      return res.status(404).json({ message: 'Admitted record not found' });
    }
    res.status(200).json({ message: 'Admitted record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting Admited record' });
  }
});

//update admission
router.put('/:id', async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters
  const updateData = req.body
  

  try {
    const updateadmission = await Admission.findByIdAndUpdate(id,updateData,{new:true}); // 
  

    if (!updateadmission) {
      return res.status(404).json({ message: ' record not found' });
    }
    res.status(200).json({ message: ' record updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating  record' });
  }
});


export default  router