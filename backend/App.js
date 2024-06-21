import express, { request, response } from 'express'
import {PORT, mongoDBURL} from './config.js'
import mongoose from 'mongoose'
import {Admission} from './Models/Admissionmodel.js'

const app = express()
app.use(express.json())


app.get('/', (request,response) => {
  console.log(request)
  return response.status(234).send('daily ward state')
})


// Route for saving a new Admission
app.post('/api/admit', async (request, response) => {
  const newAdmission = new Admission(request.body);
  // Update status based on transfer dates (optional)
if (newAdmission.transferOutDate) {
  newAdmission.status = 'Transferred';
}

// Transfer validation
const errors = [];
if (newAdmission.transferInDate && newAdmission.admissionDate) {
  if (newAdmission.transferInDate > newAdmission.admissionDate) {
    errors.push('Transfer In Date cannot be after Admission Date');
  }
}
if (newAdmission.transferOutDate && newAdmission.admissionDate) {
  if (newAdmission.transferOutDate < newAdmission.admissionDate) {
    errors.push('Transfer Out Date cannot be before Admission Date');
  }
}

if (errors.length > 0) {
  return res.status(400).json({ message: 'Validation errors', errors });
}

  try {
    const savedAdmission = await newAdmission.save();
        response.status(201).json({ message: 'Admission successful!', admission: savedAdmission });
   
  } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: 'Error saving admission' });
  }
});

// Transfer In routes
app.post('/api/transfer-in', async (request, response) => {
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

// Transfer Out Route
app.post('/api/transfer-out', async (request, response) => {
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





//route for getting all admissions
app.get('/api/admissions', async (request,response) =>{
  try {
    const admissions = await Admission.find()
    response.json(admissions)
    
  } catch (error) {
    console.error(error)
    response.status(500).json({message:'error retriving admissions'})
    
  }
})
//Route for getting all admitted cases
app.get('/api/admitted', async (request,response) => {
  try {
    const Admitted = await Admission.find({status:'Admitted'}) 
    response.json(Admitted)
  } catch (error) {
    console.error(error)
    response.status(500).json({message:'error retrieving all admitted cases'})
    
  }
})
app.delete('/api/admitted/:id', async (req, res) => {
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

//Route to get all discharges
app.get('/api/discharges', async (request, response) => {
  try {
    const Discharges = await Admission.find({status:'Discharged'})
    response.json(Discharges)
    
  } catch (error) {
    console.error(error)
    response.status(500).json({message:'error retreiving all discharges'})
    
  }
})

//Route to get all Expired
app.get('/api/expired', async (request, response) => {
  try {
    const Expired = await Admission.find({status:'Expired'})
    response.json(Expired)
    
  } catch (error) {
    console.error(error)
    response.status(500).json({message:'error retreiving all discharges'})
    
  }
})
// route to all trans outs
app.get('/api/transfer-outs', async (request, response) => {
  try {
    const admissions = await Admission.find({ transferOutDate: { $exists: true } });
    response.status(200).json({ message: 'Transfer Out Data', transferOuts: admissions });
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: 'Error retrieving transfer out data' });
  }
});

app.delete('/api/transfer-outs/:id', async (req, res) => {
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

app.delete('/api/transfer-outs/:id', async (req, res) => {
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


//route to all trans ins
app.get('/api/transfer-ins', async (request, response) => {
  try {
    const admissions = await Admission.find({ transferInDate: { $exists: true } });
    response.status(200).json({ message: 'Transfer Out Data', transferOuts: admissions });
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: 'Error retrieving transfer out data' });
  }
});



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