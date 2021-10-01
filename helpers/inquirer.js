//Animaciones en la pantalla
const inquirer = require("inquirer");

//Colores 
require('colors');


const preguntas =[

    {
        type: 'list',
        name: 'opt',
        message: '¿Qué deseas hacer?',
        choices: [

            {
                value:'1',
                name: `${'1.'.bold.green} Crear tarea`
            },

            {
                value:'2',
                name: `${'2.'.bold.green} Listar tareas`
            },

            {
                value:'3',
                name: `${'3.'.bold.green} Listar tareas completadas`
            },

            {
                value:'4',
                name: `${'4.'.bold.green} Listar tareas faltantes`
            },

            {
                value:'5',
                name: `${'5.'.bold.green} Completar tarea(s)`
            },

            {
                value:'6',
                name: `${'6.'.bold.green} Borrar tarea`
            },

            {
                value:'0',
                name: `${'0.'.bold.green} Salir`
            },

        ]
    }

];

const inquirerMenu = async ()=>{
    
    console.clear();
    console.log("=========================".rainbow);
    console.log("  Seleccione una opción  ".bold.green);
    console.log("=========================\n".rainbow);

    const {opt} = await inquirer.prompt(preguntas);

    return opt;

}


const pausa = async() => {

    const pregunta =[
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ];

    await inquirer.prompt(pregunta);
    
}

const leerInput = async( mensaje ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async( tareas=[] ) => {

    const choices = tareas.map((tarea,i) => {
        const idx = `${i + 1}`.bold.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.bold.green + 'Cancelar'
    });

    const preguntas =[

        {
            type: 'list',
            name: 'id',
            message:'Borrar',
            choices
        }

    ]

    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (message) =>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async( tareas=[] ) => {

    const choices = tareas.map((tarea,i) => {
        const idx = `${i + 1}`.bold.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [

        {
            type: 'checkbox',
            name: 'ids',
            message:'Selecciones',
            choices
        }

    ]

    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}

//Funciones que voy a exportar
module.exports= {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}

