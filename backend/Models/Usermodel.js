import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
 
  userName: {
    type: String,
    required:[ true, 'please enter a password'],
    unique: true,
    trim: true, 
    lowercase:true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    match: [/^[a-zA-Z0-9._-]+$/, 'Username can only contain letters, numbers, dots, underscores, and hyphens'],
   },
  password: {
    type: String,
    required:[ true, 'please enter a password'],
    minLength:[6,'password should be at least 6 charaters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
   },

  ward: {
    type: String,
    enum: ['Male Medical', 'Female Medical','Male Surgical','Female Surgical','NICU','Maternity','Kids Ward'],
    
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
