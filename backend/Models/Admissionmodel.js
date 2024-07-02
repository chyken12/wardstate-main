import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true
  },
  patientId: {
      type: String,
      required: true
  },
  admissionDate: {
      type: Date,
      default: Date.now
  },
  dischargeDate: {
      type: Date
  },
  status: {
      type: String,
      enum: ['Admitted', 'Discharged', 'Expired','Transferred'],
      default: 'Admitted'
  },
  nhisStatus: {
    type: String,
    enum: ['Insured', 'NoneInsured'],
    
},
  transferInDate: {
    type: Date 
},
transferOutDate: {
    type: Date
},
transferringWard: {
    type: String
}
  },
  
  {
    timestamps:true,
  }
)

const Admission = mongoose.model('Admission',admissionSchema);

export default Admission;