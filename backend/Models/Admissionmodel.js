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
  transferInDate: {
    type: Date
},
transferOutDate: {
    type: Date
},
transferringHospital: {
    type: String
}
  },
  
  {
    timestamps:true,
  }
)

export const Admission = mongoose.model('Admission',admissionSchema);