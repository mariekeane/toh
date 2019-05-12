import express from 'express';

var router = express.Router();
var ctrlHero = require('../controllers/heroController');

router.get('/heroes', ctrlHero.getAllHeroes);
router.get('/heroes/:id', ctrlHero.getHeroById);
router.post('/heroes', ctrlHero.addHero);
router.put('/heroes/:id', ctrlHero.updateHero);
router.delete('/heroes/:id', ctrlHero.deleteHero);

export default router;