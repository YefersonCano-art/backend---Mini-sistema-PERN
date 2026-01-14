import express from 'express';
import cors from 'cors';
import router from './routes/router';
import db from './config/db';
import { startAutoCleanup } from './services/databaseCleanup';


//conectar a la base de datos
async function conectarDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log('Conexión a la base de datos establecida correctamente.');
    
    // ACTIVAR LIMPIEZA AUTOMÁTICA
    // Cambia el número para ajustar el intervalo (en minutos)
    // 24 horas = 1440 minutos
    startAutoCleanup(1440);
    
  } catch (error) {
    console.log('error', error);
    console.error('No se pudo conectar a la base de datos:', error);
  }
}
conectarDB();

const app = express();

// Configurar CORS con orígenes permitidos
const corsOptions = {
  origin: [
    'http://localhost:5173', // Vite dev
    'http://localhost:3000', // React/Next dev
    'https://frontend-mini-sistema-pern.vercel.app' // Producción
  ]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/productos', router);
export default app;