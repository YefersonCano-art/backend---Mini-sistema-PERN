import { Sequelize } from "sequelize-typescript";  

// Cargar .env solo si existe (en desarrollo)
try {
    process.loadEnvFile();
} catch (error) {
    // En producción no hay .env, las variables vienen de Render
}

const db = new Sequelize(process.env.DATABASE_URL, {
    models: [__dirname + '/../models/']
});
export default db;
