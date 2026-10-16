import { Schema, model } from 'mongoose';

// Setup schema
const authSchema = new Schema({
    email: { 
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true
    },
    password:  { 
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    }
});

export default model('Auth', authSchema);