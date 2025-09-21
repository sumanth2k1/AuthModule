const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required: [true, 'Please Provide you Full name.'],
        minlength: 5,
        maxlength: 20,
    },
    email : {
        type: String,
        unique: true,
        sparse: true,
        validate: {
            validator: (email) => !email || validator.isEmail(email),
            message: "Please provide a valid email address."
        }
    },
    phone : {
        type: String,
        unique: true,
        sparse: true,
        validate: {
            validator: (phone) => !phone || validator.isMobilePhone(phone, "any"),
            message: "Please provide a valid phone no."
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (password) => validator.isStrongPassword(password),
            message: "Password must include uppercase, lowercase, number, and symbol"
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, { timestamps: true })

UserSchema.index({ email:1 }, { unique:true, partialFilterExpression: { email: { $exists: true, $ne: "" } } });
UserSchema.index({ phone:1 }, { unique:true, partialFilterExpression: { phone: { $exists: true, $ne: "" } } });

UserSchema.pre("validate", function(next){
    if(!this.email && !this.phone) {
        this.invalidate('email', 'Either Email or Phone is required.');
        this.invalidate('phone', 'Either Email or Phone is required.');
    }
    next();
});

UserSchema.pre('save', async function(){
    if(!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (inputPass){
    const isMatch = await bcrypt.compare(inputPass, this.password);
};

module.exports = mongoose.model('User', UserSchema);