import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Hero from './models/Hero';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/toh', {useNewUrlParser: true, useFindAndModify: false});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/heroes').get((req, res) => {
    Hero.find((err, heroes) => {
        if (err)
            console.log(err);
        else
            res.json(heroes);
    });
});

router.route('/heroes/:id').get((req, res) => {
    Hero.findById(req.params.id, (err, hero) => {
        if (err)
            console.log(err);
        else
            res.json(hero);
    })
});

router.route('/heroes').post((req, res) => {
    let hero = new Hero(req.body);
    hero.save()
        .then(hero => {
            res.status(200).json({'hero': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/heroes/:id').put((req, res) => {
    Hero.findById(req.params.id, (err, hero) => {
        if (!hero)
            return next(new Error('Could not load Document'));
        else {
            hero.name = req.body.name;
            hero.skills = req.body.skills;
            hero.appointments = req.body.appointments;

            hero.save().then(hero => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/heroes/:id').delete((req, res) => {
    Hero.findByIdAndRemove({_id: req.params.id}, (err, hero) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));