
import express, { request, response } from 'express'
import Admission from '../models/Admissionmodel.js';


  const router = express.Router()

// Route for saving a new Admission
// Route for saving a new Admission
router.post('/', async (request, response) => {
  const newAdmission = new Admission({
    ...request.body,
    transferOutDate: request.body.transferOutDate || null,
    transferInDate: request.body.transferInDate || null,
    transferInDate: request.body.transferInDate || null,
    dischargeDate: request.body.dischargeDate || null,
    expiredDate: request.body.expiredDate || null,
  });
  
  // Update status based on transfer dates (optional)
if (newAdmission.transferOutDate) {
  newAdmission.status = 'TransferedOut';
}
else if(newAdmission.transferInDate){
  newAdmission.status = 'TransferIn'
}
else if(newAdmission.dischargeDate){
  newAdmission.status = 'Discharged'
}
else{
  newAdmission.status = 'Expired'
}
// Transfer validation
const errors = [];
if (newAdmission.transferInDate && newAdmission.admissionDate) {
  if (newAdmission.transferInDate < newAdmission.admissionDate) {
 errors.push('Transfer In Date cannot before Admission Date');
  }
}
if (newAdmission.transferOutDate && newAdmission.admissionDate) {
  if (newAdmission.transferOutDate < newAdmission.admissionDate) {
    errors.push('Transfer Out Date cannot be before Admission Date');
  }
}



if (errors.length > 0) {
  return response.status(400).json({ message: 'Validation errors', errors });
}

  try {
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