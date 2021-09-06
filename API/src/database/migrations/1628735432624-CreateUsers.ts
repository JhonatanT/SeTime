import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1626127585142 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({//criando a migration da tabela users - CRIANDO A TABELA EM SI, passando como ela vai ser ex: create table etc
                name: "users",
                columns: [
                    {
                        name: "ID_usu",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "usuario",
                        type: "varchar"
                    },
                    {
                        name: "senha",
                        type: "varchar"
                    },
                    {
                        name: "admin",
                        type: "boolean",
                        default: false
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

                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("users");

    }
}
