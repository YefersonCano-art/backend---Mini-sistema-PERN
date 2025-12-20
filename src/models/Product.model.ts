
import {  Table, Column, Model, DataType, Default} from "sequelize-typescript";

@Table({
    tableName: 'products',})

class Product extends Model {

    @Column({
        type: DataType.STRING(100),
    })
    name!: string;

    @Column({
        type: DataType.FLOAT,
    })
    price!: number;

}

export default Product;