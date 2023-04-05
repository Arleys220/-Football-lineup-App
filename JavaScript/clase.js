class Jugador {
    constructor(numero, nombre , edad, posicion, nacionalidad, imagen,id){
        this.id= id
        this.numero = numero,
        this.nombre = nombre,
        this.edad = edad,
        this.posicion = posicion
        this.nacionalidad = nacionalidad
        this.imagen = imagen
    }
    mostrarDatosJugador(){
        console.log(`El jugador ${this.nombre}, con el numero ${this.numero} tiene ${this.edad} años de edad y juega de ${this.posicion}`)
        
    }
}


let ColegialesFC = []

const cargaDesdeJson = async ()=> {

    const response =  await fetch("Equipo.json")
    const datos = await response.json()
    console.log(datos)
    for(let jugadorN of datos){
        let jugadorNuevo = new Jugador (jugadorN.numero, jugadorN.nombre,jugadorN.edad, jugadorN.posicion,jugadorN.nacionalidad,jugadorN.imagen, jugadorN.id)
        ColegialesFC.push(jugadorNuevo)
    }
    localStorage.setItem("ColegialesFC", JSON.stringify(ColegialesFC))
}


if(localStorage.getItem("ColegialesFC")){
    ColegialesFC = JSON.parse(localStorage.getItem("ColegialesFC"))
}else{
    cargaDesdeJson()
}