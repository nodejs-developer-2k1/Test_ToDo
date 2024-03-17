import mongoose from 'mongoose';
const ToDo_Work = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    idUser: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        default: 0
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
    collection: 'ToDo_Work',
    versionKey: false,
    timestamp: true
});

export default mongoose.model("ToDo_Work", ToDo_Work);