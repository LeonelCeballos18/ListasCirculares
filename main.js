class Nodo{
    constructor(nombre, minutos){
        this.nombre = nombre;
        this.minutos = minutos;
        this.sig = null;
        this.ant = null;
    }

    info(){
        return `Ruta: ${this.nombre}, Tiempo: ${this.minutos} \n`;
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
                return this.primero;
            }
            while(aux != this.primero){
                if(aux.nombre === nombre){
                    return aux;
                }
                aux = aux.sig;
            }
        }
        return null;
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
        if(!(horaInicio > 24 || horaFin > 24)){
            let cadena = "---> Recorrido rutas <---\n";
            let baseI = this.buscar(baseInicio);
            let aux = this.primero;
            this.primero = baseI;
            if(horaFin<horaInicio || horaFin === horaInicio){
                horaFin+=horaInicio;
            }
            let inicioM = (horaInicio * 60) + minutoInicio; 
            let finM = (horaFin * 60) + minutoFin;
            while((inicioM+aux.minutos) <= finM){
                aux = aux.sig;
                inicioM+=aux.minutos;
                cadena += `Ruta: ${aux.nombre} Tiempo: ${aux.minutos} Inicio: ${this.conversion((inicioM-aux.minutos))} Fin: ${this.conversion(inicioM)}\n`;
            }
            return cadena;
        }
        return null;
    }

    conversion(m){
        if(m>=1440){
            return Math.floor((m-1440)/60) +":"+ ((m-1440)%60);
        }
        return Math.floor(m/60) +":"+ (m%60);
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
console.log(recorridoRuta.buscar("A12").info());
console.log(recorridoRuta.imprimir());
console.log(recorridoRuta.recorrido("A12", 12, 30, 20, 20));
