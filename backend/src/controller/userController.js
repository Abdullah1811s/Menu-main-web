import User from '../models/User.js';


//TODO:add increment spin and increase point func

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password resetPasswordToken resetPasswordExpire');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err.message });
    }
};


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
            .select('-password resetPasswordExpire resetPasswordToken')
            .populate('memberships');

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving user", error: err.message });
    }
};


export const updateUser = async (req, res) => {
    try {
        const updatedData = { ...req.body };
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updatedData },
            { new: true, runValidators: true }
        ).select('-password resetPasswordExpire resetPasswordToken ')

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Error updating user", error: err.message });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err.message });
    }
};
