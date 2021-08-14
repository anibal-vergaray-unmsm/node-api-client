const {Router} = require('express');
const router = Router();

const { getClients, createClient, getAverage } = require ('../controllers/index.controller');

router.get('/clients', getClients)
router.post('/clients', createClient)
router.get('/clients/promedio-edades', getAverage)

module.exports = router;