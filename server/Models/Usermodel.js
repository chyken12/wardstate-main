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
    required: [true, 'Please select a ward'] // Ensure the ward is required
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
    required: true,
  }, // Reference to Ward

  role: { type: String, enum: ["user", "admin"], default: "user" }, // Roles
});

// Consolidated Password Hashing and Username Validation Middleware
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
  }
  next();
});

// Compare Passwords Method
UserSchema.methods.comparePassword = async function(enteredPassword) {
  
  const match = await bcrypt.compare(enteredPassword, this.password);
  
  return match;
};


const User = mongoose.model("User", UserSchema);

export { User, Ward };
