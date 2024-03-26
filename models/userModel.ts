import mongoose, {Model} from "mongoose";
import {User} from "../types/types";


const userSchema = new mongoose.Schema<User, Model<User>>({
    name: {
        type: String,
        required: [true, "A person must have a first name"],
        trim: true,
        minLength: [2, "First name must be at least 2 characters long"],
        maxLength: [20, "First name must be at most 20 characters long"],
    },
    email: {
        type: String,
        validate: {
            validator: function (email: string) {
                return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
            },
            message: (props: { value: any; }) => `${props.value} is not a valid email address`,
        },
        required: [true, 'Email address validation failed'],
        unique: true,
        lowercase: true,
    }
});

const User = mongoose.model<User>('User', userSchema);

export default User;
