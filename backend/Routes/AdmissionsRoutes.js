
import express, { request, response } from 'express'
import Admission from '../Models/Admissionmodel.js';
import { User,Ward } from '../Models/Usermodel.js';

  const router = express.Router()


// Route for saving a new Admission
router.post('/', async (request, response) => {
 
  const newAdmission = new Admission({
    ...request.body,
    transferOutDate: request.body.transferOutDate || null,
    transferInDate: request.body.transferInDate || null,
    transferInDate: request.body.transferInDate || null,
    dischargeDate: request.body.dischargeDate || null,
    expiredDate: request.body.expiredDate || null,
    admissionStatus:'Admitted',
    status:'Admitted' 
  });
 

 

  if (request.body.status) {
   
    newAdmission.status = request.body.status;
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
    if (error.name === 'ValidationError') {
      response.status(400).json({ error: error.message, details: error.errors });
    } else {
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// this two are different
// route for getting all admissions
router.get('/', async (request,response) =>{
  try {
    const admissions = await Admission.find()
    response.json(admissions)
    
  } catch (error) {
    console.error(error)
    response.status(500).json({message:'error retriving admissions'})
    
  }
})
router.get('/:id', async (request,response) =>{
  const {id} = request.params.id
  try {
    const admission = await Admission.find(id)
    response.json(admission)
    
  } catch (error) {
    console.error(error)
    response.status(500).json({message:'error retriving admissions'})
    
  }
})


// Fetch admissions for a specific ward
router.get('/ward/:wardType', async (req, res) => {
  try {
    // Decode the wardType to handle spaces (and other URL-encoded characters)
    const wardType = decodeURIComponent(req.params.wardType);
    console.log('Ward type from route:', wardType); // Log the requested ward type
    const admissions = await Admission.find({ ward: new RegExp(`^${wardType}$`, 'i') });
    console.log('Admissions found:', admissions); // Log the found admissions
    res.json(admissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


//Route for getting all admitted cases
router.get('/admitted', async (request,response) => {
  try {
    const Admitted = await Admission.find({ admissionStatus:'Admitted'}) 
    response.json(Admitted)
  } catch (error) {
    console.error(error)
    response.status(500).json({message:'error retrieving all admitted cases'})
    
  }
})
//route to delete an admitted case
router.delete('/:id', async (req, res) => {
  try {
    const deletedAdmission = await Admission.findByIdAndDelete(req.params.id);
    if (!deletedAdmission) {
      return res.status(404).json({ message: 'Admission record not found' });
    }
    res.status(200).json({ message: 'Admission record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting Admission record', error: err.message });
  }
});

//update admission
router.put('/update-admission/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedAdmission = await Admission.findOneAndUpdate(
      { patientId: id },
      updateData,
      { new: true }
    );

    if (!updatedAdmission) {
      return res.status(404).json({ message: 'Admission record not found' });
    }
    res.status(200).json({ message: 'Admission record updated successfully', admission: updatedAdmission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating admission record', error: err.message });
  }
});


router.get('/users/:id', async(req,res) => {
  try {
    const user = await User.findById(req.param.id).populate('ward')
    if(!user){
      return res.status(404).json({message:'User not found'})
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})


export default  router