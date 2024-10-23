import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    loginType: [],
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String },
    accountType: { type: String, enum: ['Personal', 'Dealer'] },
    rating: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: Number },
    verificationCodeExpire: { type: String },
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    resetPasswordToken: { type: String },
    adsCount:{ type: Number ,default:0} ,
    reviewCount:{ type: Number ,default:0},
    resetPasswordExpires: { type: Date },
    favoriteVehicles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
    }],
    reports: [{ vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }, reason: { type: String } }],


    dealerName: { type: String },
    licenseNumber: { type: String },
    location: { type: String },
    salesHours: { type: String },
    hasWhatsApp: { type: Boolean, default: false },
    showEmail: { type: Boolean, default: false },
    servicesOffered: [{ type: String }],

  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('matchedd',enteredPassword, this.password)
  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});


userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);

export default User;