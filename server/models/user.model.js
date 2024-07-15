const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function (next) {
    try {
        // Avant de sauvegarder un user, on hash le password
        const hashedPassword = await bcrypt.hash(this.password, 10); // Contrairement à ce que dit l'IDE, il faut un await
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);
