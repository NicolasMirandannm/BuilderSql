import SqlSelect, {Operador} from "./sqlScript";

export default class SqlSelectBuilder {
    private parametros_select: string[] = [];
    private fromEntity: string = ' from ';
    private clausulaWhere: [{ parametro: string; operador: Operador; valor: string | number; }] | undefined;
    private where: string | undefined;
    private group_by: string | undefined;
    private order_by: string | undefined;

    constructor() {
    }

    public addParametroSelect(param: string): SqlSelectBuilder {
        if (this.parametros_select[0] == ' * ') {
            return this
        }
        this.parametros_select.push(` ${param} `);
        return this;
    }

    public addTodosParametrosSelect(): SqlSelectBuilder {
        if (this.parametros_select.length > 0) {
            return this
        }
        this.parametros_select.push(' * ');
        return this;
    }

    public from(entidade: string): SqlSelectBuilder {
        this.fromEntity.concat(` ${entidade} `);
        return this;
    }

    public where1eq1(): SqlSelectBuilder {
        this.where = ' where 1=1 ';
        return this;
    }

    public and(parametro: string, operador: Operador, valor: string | number): SqlSelectBuilder {
        if (!this.clausulaWhere)
            this.clausulaWhere = [{parametro, operador, valor}]
        else
            this.clausulaWhere.push({parametro, operador, valor});
        return this;
    }

    public groupBy(grupo: string[]): SqlSelectBuilder {
        this.group_by = ` group by ${grupo.join(', ')} `;
        return this;
    }

    public orderBy(ordem: string[]): SqlSelectBuilder {
        this.order_by = ` order by ${ordem.join(', ')} `;
        return this;
    }

    public build(): SqlSelect {

        if (this.fromEntity == null) {
            throw new Error('sem tabela selecionada para o from');
        } else if (this.where != ' where 1=1 ') {
            throw new Error('sem clausula where')
        }

        if(this.clausulaWhere != null) {
            const clausulaWhere = this.clausulaWhere.map(({parametro, operador, valor}) => {
                if (operador === Operador.diferente) {
                    return ` and not ${parametro} = ${valor} `;
                }
                if (operador === Operador.contem) {
                    return ` and ${parametro} like '%${valor}%' `
                }

                return ` and ${parametro} ${operador} ${valor}`
            })

            this.where.concat(clausulaWhere.join(' '))
        }

        const select = ` select `.concat(this.parametros_select.join(', '))
        return new SqlSelect(
            select,
            this.fromEntity,
            this.where,
            this.group_by,
            this.order_by
        )
    }
}