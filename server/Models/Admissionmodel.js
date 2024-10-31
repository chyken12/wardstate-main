import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true
  },
  patientId: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^er-[a-z0-9]{3}-[a-z]{3}\d{4}$/i, // 'i' flag makes the regex case-insensitive
      'Password must be in the format ER-A06-ABC1235, with "er-" (case-insensitive), a letter or digit, two digits, a hyphen, and four digits.',
    ],
    
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
      enum: ['Admitted', 'Discharged', 'Expired','TransferOut','TransferIn'],
     
  },
  admissionStatus: {
    type: String,
    enum: ['Admitted'],
    default:'Admitted',
   
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