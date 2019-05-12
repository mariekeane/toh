import Hero from '../models/Hero';

export function getAllHeroes(req, res) {
    Hero.find((err, heroes) => {
        if (err)
            console.log(err);
        else
            res.json(heroes);
    });
  }
  
  export function getHeroById(req, res) {
    Hero.findById(req.params.id, (err, hero) => {
        if (err)
            console.log(err);
        else
            res.json(hero);
    })
  }
  
  export function addHero(req, res) {
    let hero = new Hero(req.body);
    hero.save()
        .then(hero => {
            res.status(200).json({'hero': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
  }

  export function updateHero(req, res) {
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
  }
  
  export function deleteHero(req, res) {
    Hero.findByIdAndRemove({_id: req.params.id}, (err, hero) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
}