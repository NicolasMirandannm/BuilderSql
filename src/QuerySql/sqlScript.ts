import {PrismaClient} from "@prisma/client";

export enum Operador {
    igual = '=',
    maiorOuMenor = '<>',
    maior = '>',
    menor = '<',
    diferente = 0,
    contem = 1

}

export enum OrderEnum {
    crescente='ASC',
    descrescente='DESC'
}

export default class SqlSelect {
    constructor(
        private readonly parametros_select: string,
        private readonly from: string,
        private readonly where: string,
        private readonly group_by: string | undefined,
        private readonly order_by: string | undefined) {
    }

    public montarSql(): string {

        let sql: string = "";

        if (this.parametros_select == null || this.from == null) {
            throw new Error('select invalido');
        }
        sql += ` ${this.parametros_select} ${this.from} `;

        if (this.where != null) {
            sql += this.where
        }

        if (this.group_by != null) {
            sql += this.group_by
        }
        if (this.order_by != null) {
            sql += this.order_by
        }
        return sql;
    }
}