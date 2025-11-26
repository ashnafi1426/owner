import { loginUser } from '../services/loginService.js';

 const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user, token } = await loginUser(email, password);
        res.status(200).json({
            message: 'Login successful',
            user,
            token,
        });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};
export default login