require('colors');

//impotación de mis modulos

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu, 
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');
console.clear();

const main = async()=>{

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    //Cargar tareas desde mi archivo txt
    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{
        //Espera a que ingrese el valor
        opt = await inquirerMenu();

        //Opción seleccionada
        //console.log({opt});

        switch(opt){
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTareas(desc);
            break;

            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendientesCompletadas(true);
            break;

            case '4':
                tareas.listarPendientesCompletadas(false);
            break;

            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0'){
                    const ok = await confirmar('¿Está seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('');
                        console.log('Tarea borrada'.bold.yellow);
                        console.log('');
                    }
                }
            
            break;
        }

        guardarDB(tareas.listadoArr);

         
        //Pausa si no es 0
        if(opt !== '0'){
            await pausa();
        }
       
        
    }while(opt !== '0');
  
}

main(); 