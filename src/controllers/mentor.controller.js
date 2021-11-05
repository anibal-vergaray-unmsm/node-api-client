const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://sooqmrmbakkjfq:fcc3190aacf918b10cd056e75a6c97f323894a5b2c1ce050229ded7870e98e93@ec2-3-217-68-126.compute-1.amazonaws.com:5432/dec5ovvd6q2sj6',
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
    if (dni && nivel && idMentorSuperior){
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