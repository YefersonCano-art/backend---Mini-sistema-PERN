import { Request, Response } from 'express';
import Product from "../models/Product.model"
import { resetDatabase } from '../services/databaseCleanup';


const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll();
    res.json({data: products});
}

const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    res.json(product);
}

const createProduct= async (req: Request, res: Response) => {
    
  const product =  await Product.create(req.body);
  res.status(201).json({message: 'Producto creado', product});
};

const editProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({message: 'Producto no encontrado'});
    }
    await product.update(req.body);
    res.json({message: 'Producto actualizado', product});
}

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({message: 'Producto no encontrado'});
    }
    await product.destroy();
    res.json({message: 'Producto eliminado'});
}

const resetDemo = async (req: Request, res: Response) => {
    const result = await resetDatabase();
    if (result.success) {
        res.json(result);
    } else {
        res.status(500).json(result);
    }
}

export { createProduct, getProducts, getProductById, editProduct, deleteProduct, resetDemo };