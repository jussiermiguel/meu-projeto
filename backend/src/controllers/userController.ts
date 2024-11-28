import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken';

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ 
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            token: generateToken(user._id) 
        });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar usuário' });
    }
};
