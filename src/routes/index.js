const {Router} = require('express');
const router = Router();

const { getClients, createClient, getAverage } = require ('../controllers/index.controller');

router.get('/users', getClients)
router.post('/users', createClient)
router.get('/users/promedio-edades', getAverage)

module.exports = router;