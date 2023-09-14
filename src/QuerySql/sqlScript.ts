import {PrismaClient} from "@prisma/client";

export enum Operador {
    igual = '=',
    maiorOuMenor = '<>',
    maior = '>',
    menor = '<',
    diferente = 0,
    contem = 1

}

export default class SqlSelect {
    private readonly prisma = new PrismaClient();
    constructor(
        private readonly parametros_select: string,
        private readonly from: string,
        private readonly where: string,
        private readonly group_by: string | undefined,
        private readonly order_by: string | undefined) {
    }

    public async executar(): Promise<any> {
        try {
            const sql = this.montarSql();
            console.log(sql)
            return await this.prisma.$queryRaw`${sql}`;
        }
        catch (err) {
            await this.prisma.$disconnect()
        }
        finally {
            await this.prisma.$disconnect()
        }

    }

    private montarSql(): string {

        const sql: string = "";

        if (this.parametros_select == null || this.from == null) {
            throw new Error('select invalido');
        }
        sql.concat(` ${this.parametros_select} ${this.from} `);

        if (this.where != null) {
            sql.concat(this.where)
        }

        if (this.group_by != null) {
            sql.concat(this.group_by)
        }
        if (this.order_by != null) {
            sql.concat(this.order_by)
        }
        return sql;
    }
}