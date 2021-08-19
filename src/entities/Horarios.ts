import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany, ManyToMany, ManyToOne } from "typeorm"
import { v4 as uuid } from "uuid"
import { User } from "./User";
import { Expose } from "class-transformer"

@Entity("tb_horarios")
class Horarios {

    @PrimaryColumn()
    readonly id: string;

    //FAZENDO UM JOIN NA CLASSE USER
    @Column()
    FK_ID_usu: string;
    @JoinColumn({ name: "FK_ID_usu" })
    @OneToMany(() => User, FK_ID_usu => FK_ID_usu.id)//1 para muitos ou seja 1 usuarios pode ter varios horarios
    FK_ID_USU: User

    @Column()
    nome_cliente: string;

    @Column()
    descricao_pedido: string;

    @Column()
    preco: Number;

    @Column()
    data_pedido: Date;

    @Column()
    horario: string;

    @Column()
    troco: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    //criando uma string a mais, basicamente adionando uma coluna a mais, porem não esta dentro do bd
    @Expose({ name: "algo_Custom" })
    algoCustom(): string {
        return `#${this.nome_cliente}`
    }

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { Horarios }