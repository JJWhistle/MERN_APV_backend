import express from "express";
import dotenv from 'dotenv/config.js';
import conectarDB from "./config/db.js";
import veterinarioRouts from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/paceinteRoutes.js';
import cors from "cors";

const app = express();
app.use(express.json());

conectarDB();
const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            // El origen del request esta permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors(corsOptions));

app.use('/api/veterinarios', veterinarioRouts);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor en el port ${PORT}`);
})