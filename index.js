const express = require('express');
const cors = require('cors');
const PORT = 7000;
const sequelize = require('./config/db');
const router = require('./routes/index')
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/api', router)

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`server is running on:\nhttp://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()