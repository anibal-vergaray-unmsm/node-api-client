const {Router} = require('express');
const router = Router();

const { getClients, createClient, getAverage, getGroupByAge } = require ('../controllers/index.controller');

router.get('/clientes', getClients)
router.post('/clientes', createClient)
router.get('/clientes/promedio-edades', getAverage)
router.get('/clientes/grupos-por-edad', getGroupByAge)

module.exports = router;