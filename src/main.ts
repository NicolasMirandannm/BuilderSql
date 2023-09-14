import SqlSelectBuilder from "./QuerySql/sqlSelectBuilder";
import {Operador} from "./QuerySql/sqlScript";



async function main() {
    const sqlSelect =
        new SqlSelectBuilder()
            .addParametroSelect('id')
            .addParametroSelect('nome')
            .from('Usuario')
            .where1eq1()
            .and('nome', Operador.igual, 'nicolas leonardo')
            .build();

    console.log(sqlSelect)
    // const usuario = await sqlSelect.executar();
    // console.log(usuario)
}

main().then(() => {
    console.log('fim.')
}).catch(err => console.log('erro'))