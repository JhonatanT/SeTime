import { Exclude } from "class-transformer";
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
    //caso o nome da coluna no bd fosse diferente poderia expecificar dentro dos ("NOME DA COLUNA NO BD")
    @PrimaryColumn()
    readonly id: string;

    @Column()
    usuario: string;

    @Exclude() //excluindo a coluna de senha, para que na hora de listar os usuarios n trazer essa info
    @Column()
    senha: string;

    @Column()
    admin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}
export { User };
