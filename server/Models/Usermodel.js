import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const WardSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "Male Medical",
      "Female Medical",
      "Male Surgical",
      "Female Surgical",
      "NICU",
      "Maternity",
      "Kids Ward",
    ],
    required: [true, 'Please select a ward']
  }
});

const Ward = mongoose.model("Ward", WardSchema);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [30, "Username cannot exceed 30 characters"],
    match: [
      /^[a-zA-Z0-9._-]+$/,
      "Username can only contain letters, numbers, dots, underscores, and hyphens",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  ward: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ward",
    required: function() {
      return this.role === "user"; // Only required if role is user
    }
  },
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user",
    lowercase: true, // Ensure role is always stored in lowercase
  }
});

// Middleware to transform role to lowercase before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  
  // Convert role to lowercase
  if (this.role) {
    this.role = this.role.toLowerCase();
  }
  
  next();
});

UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export { User, Ward };