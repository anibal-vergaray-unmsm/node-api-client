const {connectionString} = require('../developmentSettings');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})

const getMentores= async (req, res) => {
    const sql = "SELECT * FROM mentor";
    try {
        const response = await pool.query(sql);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({
            message:"Ocurrio un error"
        })
    }
   
}

const createMentor = async (req, res) => {
    const {dni, nivel, idMentorSuperior} = req.body;
    if (dni && nivel){
        try {
            const sql = "INSERT INTO mentor (dni, nivel, idMentorSuperior) VALUES ($1, $2, $3)";
            const response = await pool.query(sql, [dni, nivel, idMentorSuperior]);
            res.status(200).json({
                message: 'Mentor agregado',
                body: {
                    cliente: {dni, nivel, idMentorSuperior}
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

module.exports = {
    getMentores,
    createMentor
}