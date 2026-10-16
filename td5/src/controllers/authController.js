import auth from '../models/userModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function registerUser(req, res){
    try{
        const {email, password} = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await auth.create({email: email, password: hashedPassword});
        return res.status(201).json({
            success: true,
            message: `Registration successfull.`
        });
    } catch (err){
        return res.status(500).json({
            success: false,
            message: `Registration of user ${body.email} failed.`
        });
    }
}

export async function loginUser(req, res){
    try{
        const {email, password} = req.body;
        const user = await auth.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: `Invalid email or password.`
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({
                succes: false,
                message: `Invalid email or password.`
            });
        }
    
        const payload = {
            userId: user._id,
            email: user.email
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token,
            data: {
                userId: user._id,
                email: user.email
            }
        }); 
    } catch (err){
        return res.status(500).json({
            success: false,
            message: `Server erro ${err.message}`
        });
    }
}