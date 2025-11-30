import { createUser } from '../services/signupService.js';

export const signupUser = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password, bio } = req.body;

        // 1️⃣ Required fields validation
        if (!firstname || !lastname || !username || !email || !password) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        // 2️⃣ Create user
        const user = await createUser({ firstname, lastname, username, email, password, bio });

        // 3️⃣ Remove password before sending response
        const { password: _, ...userWithoutPassword } = user;

        // 4️⃣ Send response
        res.status(201).json({
            message: 'User registered successfully',
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
