import Product from '../models/Product.model';
import { seedProducts } from '../data/seedData';

/**
 * Limpia toda la base de datos y la restaura con los datos de prueba
 */
export async function resetDatabase() {
  try {
    // 1. Eliminar todos los productos
    await Product.destroy({ where: {}, truncate: true });
    
    // 2. Insertar los productos de prueba
    await Product.bulkCreate(seedProducts);
    
    console.log(`✅ Base de datos reseteada - ${seedProducts.length} productos de prueba restaurados`);
    return { success: true, message: 'Base de datos reseteada correctamente', productsCount: seedProducts.length };
  } catch (error) {
    console.error('❌ Error al resetear la base de datos:', error);
    return { success: false, message: 'Error al resetear la base de datos', error };
  }
}

/**
 * Inicia la limpieza automática de la base de datos
 * @param intervalMinutes - Minutos entre cada limpieza (por defecto 24 horas = 1440 minutos)
 */
export function startAutoCleanup(intervalMinutes: number = 1440) {
  const intervalMs = intervalMinutes * 60 * 1000;
  
  console.log(`🔄 Limpieza automática activada: cada ${intervalMinutes} minutos`);
  
  // Ejecutar inmediatamente al iniciar
  resetDatabase();
  
  // Programar ejecuciones periódicas
  setInterval(() => {
    console.log('⏰ Ejecutando limpieza programada...');
    resetDatabase();
  }, intervalMs);
}
