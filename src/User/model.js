import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    loginType: [],
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String },
    accountType: { type: String, enum: ['Personal', 'Dealer'] },
    rating: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: Number },
    verificationCodeExpire: { type: String },
    resetPasswordToken: { type: String },
    adsCount:{ type: Number ,default:0} ,
    reviewCount:{ type: Number ,default:0},
    resetPasswordExpires: { type: Date },
    reports: [{ vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }, reason: { type: String } }]
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);

export default User;