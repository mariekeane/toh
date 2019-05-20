import { Seeder } from 'mongo-seeding'
import config from '../config/index';
import mongoose from 'mongoose';
import Hero from '../models/Hero';
import { createHash } from 'crypto';

export async function seedHeroCollection() {
    // https://stackoverflow.com/questions/11453617/mongoose-js-remove-collection-or-db
    await Hero.collection.drop();
    await Hero.create( {
        _id: new mongoose.Types.ObjectId().toHexString(), //5cd5308e695db945d3cc81a9
        name: 'Test Hero 1',
        skills: [
                'Skill 1',
                'Skill 2',
                'Skill 3'
        ]
    });
    await Hero.create( {
        name: 'Test Hero 2',
        skills: [
                'Skill 1'
        ]
    });
    await Hero.create( {
        name: 'Test Hero 3',
        skills: []
    });
}