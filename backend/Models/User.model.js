import mongoose from 'mongoose';
const ToDo_User = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        required: true,
        default: new Date().getTime()
    },
    updatedAt: {
        type: Number,
        required: true,
        default: new Date().getTime()
    },
}, {
    collection: 'ToDo_User',
    versionKey: false,
    timestamp: true
});

export default mongoose.model("ToDo_User", ToDo_User);