import express from 'express';
import router from './routes/router';
import db from './config/db';

//conectar a la base de datos
async function conectarDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.log('error', error);
    console.error('No se pudo conectar a la base de datos:', error);
  }
}
conectarDB();

const app = express();
app.use(express.json());
app.use('/api/productos', router);
export default app;