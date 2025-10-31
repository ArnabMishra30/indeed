import bcrypt from "bcrypt";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["job-seeker", "job-poster"],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    location: String,
    skills: [String],
    education: String,
    experience: String,
    githubLink: {
        type: String,
        default: "",
    }
}, {
    timestamps: true,
});

userSchema.pre("save", async function (next)  {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10); //a random string(as$45+o*&)
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function (enteredPass) {
    return await bcrypt.compare(enteredPass, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;