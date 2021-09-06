import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";

export class CreateHorarios1628799288657 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tb_horarios",
                columns: [
                    {
                        name: "ID_horario",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "FK_ID_usu",
                        type: "varchar",
                        default: false,
                        // caso queira que possa ser null isNullable:true
                    },
                    {
                        name: "nome_cliente",
                        type: "varchar"
                    },
                    {
                        name: "descricao_pedido",
                        type: "varchar"
                    },
                    {
                        name: "preco",
                        type: "float"
                    },
                    {
                        name: "data_pedido",
                        type: "Date"
                    },
                    {
                        name: "horario",
                        type: "varchar"
                    },
                    {
                        name: "troco",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FK_ID_usu",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["FK_ID_usu"],

                    }
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tb_horarios");
    }

}
