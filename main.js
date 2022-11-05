class Nodo{
    constructor(nombre, minutos){
        this.nombre = nombre;
        this.minutos = minutos;
        this.sig = null;
        this.ant = null;
    }
}

class ListaCircular{
    constructor(){
        this.primero=null;
    }

    agregar(nuevo){
        if (this.primero==null){
            this.primero=nuevo;
            nuevo.sig=nuevo;
            nuevo.ant=nuevo;
        }else{
            nuevo.sig = this.primero;
            nuevo.ant = this.primero.ant;
            this.primero.ant.sig=nuevo;
            this.primero.ant=nuevo;
        }
    }

    buscar(nombre){
        let aux = this.primero.sig;
        if(this.primero != null){
            if(this.primero.nombre === nombre){
                return `Ruta: ${this.primero.nombre}`;
            }
            while(aux != this.primero){
                if(aux.nombre === nombre){
                    return `Ruta: ${aux.nombre}`;
                }
                aux = aux.sig;
            }
        }
        return `La ruta no existe`;
    }

    eliminar(nombre){
        let aux = this.primero;
        if(this.primero !== null){
            if(this.primero.nombre === nombre){
                this.primero = null;
                this.primero = aux.sig;
            }else{
                while(aux.sig != this.primero){
                    if(aux.sig.nombre === nombre){
                        aux.sig = aux.sig.sig;
                        aux.ant = aux.ant;
                        break;
                    }
                    aux = aux.sig;
                }
            }
        }
    }

    imprimir(){
        let lista = `Ruta: ${this.primero.nombre}, Tiempo: ${this.primero.minutos} \n`;
        let aux = this.primero.sig;
        if(this.primero != null){
            while(aux != this.primero){
                lista+= `Ruta: ${aux.nombre}, Tiempo: ${aux.minutos} \n`;
                aux = aux.sig;
            }
        }
        return lista;
    }

    recorrido(baseInicio, horaInicio, minutoInicio, horaFin, minutoFin){
        
    }
}

let recorridoRuta = new ListaCircular();
let ruta = new Nodo("20", 30);
recorridoRuta.agregar(ruta);
ruta = new Nodo("A12", 40);
recorridoRuta.agregar(ruta);
ruta = new Nodo("A23", 40);
recorridoRuta.agregar(ruta);
console.log(recorridoRuta.imprimir());
recorridoRuta.eliminar("A23");
//console.log(recorridoRuta);
console.log(recorridoRuta.buscar("A23"));
console.log(recorridoRuta.imprimir());
