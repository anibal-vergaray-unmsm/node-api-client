const express = require('express');
const app = express();
const cors = require('cors');


// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use(require('./routes/index'))
app.use(require('./routes/mentor.routes'))

app.listen(process.env.PORT || 3000)
console.log('Server on port 3000')