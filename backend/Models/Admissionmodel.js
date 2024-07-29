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
  Age: {
    type: Number,
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
      enum: ['Admitted', 'Discharged', 'Expired','TransferedOut','TransferIn'],
     
  },
  Gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    
},
  nhisStatus: {
    type: String,
    enum: ['Active', 'InActive'],
    
},
  transferInDate: {
    type: Date 
},
expiredDate: {
  type: Date 
},
transferOutDate: {
    type: Date
},
ward: {
  type: String,
  enum: ['Male Medical', 'Female Medical','Male Surgical','Female Surgical','NICU','Maternity','Kids Ward'],
  
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