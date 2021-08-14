const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

const getClients= async (req, res) => {
    const sql = "SELECT * FROM cliente";
    try {
        const response = await pool.query(sql);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({
            message:"Ocurrio un error"
        })
    }
   
}

const createClient = async (req, res) => {
    const {nombre, apellido, fechaDeNacimiento} = req.body;
    if (nombre && apellido && fechaDeNacimiento){
        try {
            const sql = "INSERT INTO cliente (nombre, apellido, fechaDeNacimiento) VALUES ($1, $2, $3)";
            const response = await pool.query(sql, [nombre, apellido, fechaDeNacimiento]);
            res.status(200).json({
                message: 'Cliente agregado',
                body: {
                    cliente: {nombre, apellido, fechaDeNacimiento}
                }
            });
        } catch (error) {
            res.status(500).json({
                message:"Ocurrio un error"
            })
        }
        
    }else{
        res.status(500).json({
            message:"Parametros invalidos"
        });
    }
    
}

const getAverage = async (req, res) => {
    try {
        const sql = "SELECT AVG(EXTRACT(YEAR FROM age(current_timestamp, fechaDeNacimiento))) as PROMEDIO from cliente";
        const response = await pool.query(sql);
        res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Ocurrio un error"
        });
    }
}

const getGroupByAge = async (req, res) => {
    try {
        const sql = "SELECT EXTRACT(YEAR FROM age(current_timestamp, fechaDeNacimiento)) as edad, count(*) as cantidad from cliente group by edad order by edad asc";
        const response = await pool.query(sql);
        res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Ocurrio un error"
        });
    }
}

    

module.exports = {
    getClients,
    createClient,
    getAverage,
    getGroupByAge
}