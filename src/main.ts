import SqlSelectBuilder from "./QuerySql/sqlSelectBuilder";
import {Operador, OrderEnum} from "./QuerySql/sqlScript";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

const sqlSelect1 =
    new SqlSelectBuilder()
        .addParametroSelect('id')
        .addParametroSelect('nome')
        .from('Usuario')
        .where1eq1()
        .and('nome', Operador.igual, 'nicolas leonardo')
        .build();

const sqlSelect2 =
    new SqlSelectBuilder()
        .addTodosParametrosSelect()
        .from('Usuario')
        .where1eq1()
        .and('idade', Operador.maior, 17)
        .orderBy(['idade'], OrderEnum.descrescente)
        .build();

const sqlSelect3 = new SqlSelectBuilder()
    .addParametroSelect('nome')
    .addParametroSelect('idade')
    .addParametroSelect('id')
    .from('Usuario')
    .where1eq1()
    .and('idade', Operador.menor, 20)
    .build();

async function main() {

    const respostaSelect1 = await prisma.$queryRawUnsafe(sqlSelect1.montarSql())
    const respostaSelect2 = await prisma.$queryRawUnsafe(sqlSelect2.montarSql())
    const respostaSelect3 = await prisma.$queryRawUnsafe(sqlSelect3.montarSql())

    console.log('primeiro select:')
    console.log(respostaSelect1)

    console.log('segundo select:')
    console.log(respostaSelect2)

    console.log('terceiro select:')
    console.log(respostaSelect3)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })



