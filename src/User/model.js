import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const workingHoursSchema = new mongoose.Schema({
  isOpen: { type: Boolean, default: false },
  start: { type: String, default: null },
  end: { type: String, default: null }
});

const userSchema = mongoose.Schema(
  {
    fullName: { type: String,default:"" },
    lastLogin: {
      type: Date,
      default: Date.now()
  },
    firstName: { type: String,default:"" },
    lastName: { type: String,default:"" },
    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true
  }],
  permissions: [{
      resource: String,
      actions: [String]
  }],
  isActive: {
      type: Boolean,
      default: true
  },

    loginType: [],
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String },
    accountType: { type: String, enum: ['Personal', 'Dealer'],default:"Dealer" },
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

    profileImage: { type: String,default:""  },
    bannerImage: { type: String,default:"" },
    dealerName: { type: String,default:"" },
    licenseNumber: { type: String,default:"" },
    locationAddress: { type: String,default:"" },
    workingHours: {
      monday: workingHoursSchema,
      tuesday: workingHoursSchema,
      wednesday: workingHoursSchema,
      thursday: workingHoursSchema,
      friday: workingHoursSchema,
      saturday: workingHoursSchema,
      sunday: workingHoursSchema
    },
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