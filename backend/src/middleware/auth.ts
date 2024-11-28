import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded as any;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido!' });
    }
};

export default protect;
