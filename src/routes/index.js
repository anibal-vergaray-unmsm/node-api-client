const {Router} = require('express');
const router = Router();

const { getClients, createClient, getAverage } = require ('../controllers/index.controller');

router.get('/clientes', getClients)
router.post('/clientes', createClient)
router.get('/clientes/promedio-edades', getAverage)

module.exports = router;