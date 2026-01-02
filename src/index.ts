import express from 'express';
import type { Request, Response } from 'express';
import 'dotenv/config'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js';


import usersRoute from './Route/usersRoute.js'
import { setupDb } from './database/setup.js';
// import path, { dirname } from 'path'
// import { fileURLToPath } from 'url';


// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 80;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/user', usersRoute)


async function start() {
    await setupDb();
    app.listen(PORT, () => {
        console.log(`API START AT http://localhost:${PORT}`)
    })

}

start()