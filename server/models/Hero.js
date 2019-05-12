import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Hero = new Schema({
    name: { type: String },
    skills: { type: [String] },
    appointments: [
        {
            date: { type: Date },
            location: { type: String }
        }
    ]
});

export default mongoose.model('Hero', Hero, 'heroes');