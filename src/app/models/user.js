const mongoose = require('../../database');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema ({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true, 
        require: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// can't use arrow function
// it mess 'this'
// inside pre, the context is the object being saved.
UserSchema.pre('save',  async function (next) {
    const hash = await bcrypt.hash(this.password, 3);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;