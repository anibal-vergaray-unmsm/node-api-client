const {Router} = require('express');
const router = Router();

const { getMentores, createMentor} = require ('../controllers/mentor.controller');

router.get('/mentores', getMentores)
router.post('/mentores', createMentor)

module.exports = router;