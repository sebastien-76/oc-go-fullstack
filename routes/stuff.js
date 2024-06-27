const express = require('express');
const auth = require('../middleware/auth');
const multer = require('multer');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router.post('/', auth, multer, stuffCtrl.createThing);

router.get('/',auth, stuffCtrl.getAllThings);

router.get('/:id', auth, stuffCtrl.getOneThing);

router.put('/:id', auth, multer, stuffCtrl.modifyThing);

router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;