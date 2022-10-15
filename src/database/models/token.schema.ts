import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'tokens'
})
export class TokenModel extends Model{
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
    id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
    token!: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false
  })
    userId!: number;
}

