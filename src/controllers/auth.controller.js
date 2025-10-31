import User from '../model/user.model.js'
import jwt from 'jsonwebtoken'

export const registercontroller = async (req, res) => {
    const { firstName, lastName, email, role, password } = req.body;
    if (!firstName || !lastName || !email || !role || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User alreday exists" })
        }
        const newUser = new User({
            firstName, lastName, email, role, password
        })
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });

        res.json({
            message: "User created",
            token: token
        })
    } catch (err) {
        console.log("Error in Register Controller" + err);
        res.status(500).json({
            message: "Interal Server Error || Register Controller"
        })
    }
}

export const logincontroller = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(400).json({ message: "User do not exists" })
        }

        if (!(await userExists.matchPassword(password))) {
            return res.status(400).json({ message: "Wrong password" })
        }

        const token = jwt.sign({ id: userExists._id, role: userExists.role }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });
        res.json({
            message: "Logged in successfully",
            token: token
        })

    } catch (err) {
        console.log("Error in Login Controller" + err);
        res.status(500).json({
            message: "Interal Server Error || Login Controller"
        })
    }
}

export const getallusers = async (req, res) => {
    try {
        if (req.user.role !== "job-poster") {
            return res.status(400).json({ message: "You don't have permission to access all users data" })
        }
        const users = await User.find().select("-password");
        res.status(200).json({
            message: "data is below",
            data: users
        })
    } catch (error) {
        console.log("Error in GetAllUser Controller" + err);
        res.status(500).json({
            message: "Interal Server Error || GetAllUser Controller"
        })
    }
}

export const getuserbyid = async (req, res) => {
    const id = req.params.id;
    try {
        if (req.user.role !== "job-poster") {
            return res.status(400).json({ message: "You don't have permission to access all users data" })
        }
        const user = await User.findById(id).select("-password");
        res.status(200).json({
            message: "user found",
            data: user
        })
    } catch (error) {
        console.log("Error in getuserById Controller" + err);
        res.status(500).json({
            message: "Interal Server Error || getuserById Controller"
        })
    }
}

export const updateuser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (user.role !== "job-seeker") {
            return res.status(400).json({ message: "only job seekers can update their profile..." })
        }

        const { phone, location, education, experience, skills, githubLink } = req.body;

        user.phone = phone ?? user.phone;
        user.location = location ?? user.location;
        user.education = education ?? user.education;
        user.experience = experience ?? user.experience;
        user.skills = skills ?? user.skills;
        user.githubLink = githubLink ?? user.githubLink;

        // const updatedUser = {
        //     phone, location, education, experience, skills, githubLink
        // }

        const updatedUser = await user.save();
        return res.status(200).json({
            message: "Updated Sucessfully", user: {
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                phone: updatedUser.phone,
                location: updatedUser.location,
                education: updatedUser.education,
                experience: updatedUser.experience,
                skills: updatedUser.skills,
                githubLink: updatedUser.githubLink,
                role: updatedUser.role,
            }
        })

    } catch (err) {
        console.log("Error in Update User Controller :: " + err);
        res.status(500).json({
            message: "Interal Server Error || Update User Controller"
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        eexpires: new Date(0)
    });
    res.status(200).json({message: "Logged Out Successfully"})
    } catch (err) {
        console.log("Error in logout Controller :: " + err);
        res.status(500).json({
            message: "Interal Server Error || logout Controller"
        })
    }
}