
const Tarea = require('./tarea');

class Tareas{

    _listado = {};

    constructor(){
        this._listado = {};
    }

    borrarTarea( id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    cargarTareasFromArray(tareas = []){
    
        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        });
    }

    crearTareas(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach((tarea,i) =>{
            const idx = `${i + 1}`.bold.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                ? 'Completada'.bold.green
                : 'Pendiente'.bold.red;
            
            console.log(`${idx} ${ desc } :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true){
        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea,i) =>{
            const idx = `${i + 1}`.bold.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                ? 'Completada'.bold.green
                : 'Pendiente'.bold.red;
            
            if(completadas){
                if(completadoEn){
                    contador+=1;
                    console.log(`${(contador + '.').bold.green} ${ desc } :: ${completadoEn.bold.green}`);
                }
            }else{

                if(!completadoEn){
                    contador+=1;
                    console.log(`${(contador + '.').bold.green} ${ desc } :: ${estado}`);
                }

            }
           
        });
    }

    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}

//Exportamos la clase 
module.exports = Tareas;