//Capturas DOM
let equipo = document.getElementById("equipo")
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let verEquipobtn = document.getElementById("verEquipo")
let ocultarlEquipobtn = document.getElementById("ocultarEquipo")
let guardarjugadorBtn = document.getElementById("guardarjugadorBtn")
let loaderTexto = document.getElementById("loaderTexto")
let loader = document.getElementById("loader")
let bucadorFiltro = document.getElementById("selectOrden")
let botonCarrito = document.getElementById("botonCarrito")
let modalCarrito = document.getElementById("modal-bodyCarrito")
let formAgregarjugador = document.getElementById("formAgregarjugador")


//Funciones

function agregarJugador(array) {
    let numeroJugador = document.getElementById("numeroJ")
    let nombreJugador = document.getElementById("nombreJ")
    let edadJugador = document.getElementById("edadJ")
    let posicionJugador = document.getElementById("posicionJ")
    let nacionalidadJugador = document.getElementById("nacionalidadJ")


    const nuevoJugador = new Jugador(numeroJugador.value, nombreJugador.value, edadJugador.value, posicionJugador.value, nacionalidadJugador.value, "Jack Morris.jpg", array.length + 1)
    array.push(nuevoJugador)
    console.log(nuevoJugador)
    localStorage.setItem("ColegialesFC", JSON.stringify(array))
    mostrarjugadores(array)

    formAgregarjugador.reset()
    Toastify({
        text: `Usted ha agregado el jugador ${nuevoJugador.nombre} al la alineacion`,
        gravity: "top",
        position: "right",
        style:{
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "black"
        },
        duration: 2000
    }).showToast()

    numeroJugador.value = ""
    nombreJugador.value = ""
    edadJugador.value = ""
    posicionJugador.value = ""
    nacionalidadJugador.value = ""

}

function buscarNombreJugador(Buscado, array) {
    let busqueda = array.filter((jugador) => jugador.nombre.toLowerCase().includes(Buscado.toLowerCase()))

    busqueda.length == 0 ?
        (coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`,
            mostrarjugadores(busqueda)) :
        (coincidencia.innerHTML = "",
            mostrarjugadores(busqueda))
}





function mostrarjugadores(array) {
    equipo.innerHTML = ""
    for (let jugador of array) {

        let nuevoJugador1 = document.createElement("div")
        nuevoJugador1.classList.add("col-12", "col-md-6", "col-lg-4", "my-3")
        nuevoJugador1.innerHTML = `
        <div id="${jugador.numero}" class="card" style="width: 18rem;">
                <img class="card-img-top img-fluid" style="height: 200px;"src="Caratula/${jugador.imagen}" alt="${jugador.nombre} de ${jugador.edad}">
                <div class="card-body">
                            <h4 class="card-title">${jugador.nombre}</h4>
                            <p>Nacionalidad: ${jugador.nacionalidad}</p>
                            <p class="">Edad: ${jugador.edad}</p>
                            <p class="">Posicion: ${jugador.posicion}</p>
                            <p class="">Numero: ${jugador.numero}</p>

                        <button id="agregarBtn${jugador.id}" class="btn btn-outline-success"> Agregar al equipo</button>
                </div>
        </div>`
        equipo.appendChild(nuevoJugador1)

        let btnAgregar = document.getElementById(`agregarBtn${jugador.id}`)
        btnAgregar.addEventListener("click", () => {
            agregarAlineacion(jugador)
        })
    }
}


function filtroMenorMayor(array) {
    const menorMayor = [].concat(array)
    menorMayor.sort((a, b) => a.numero - b.numero)
    mostrarjugadores(menorMayor)
}

function filtroMayorMenor(array) {
    const mayorMenor = [].concat(array)
    mayorMenor.sort((c, d) => {
        return d.numero - c.numero
    })
    mostrarjugadores(mayorMenor)
}

function filtroAZ(array) {
    const filtroAlfabeticamente = [].concat(array)
    filtroAlfabeticamente.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1
        }
        if (a.nombre < b.nombre) {
            return -1
        }
        return 0;
    })
    mostrarjugadores(filtroAlfabeticamente)
}

let jugadorEnAlineacion = JSON.parse(localStorage.getItem("carrito")) || []

function agregarAlineacion(jugador) {
    
    let jugadorAgregado = jugadorEnAlineacion.find((elem) => elem.id == jugador.id)

    if (jugadorAgregado == undefined) {
        
        jugadorEnAlineacion.push(jugador)
        localStorage.setItem("carrito", JSON.stringify(jugadorEnAlineacion))
        Swal.fire({
            title: " Se agrego a la Alineacion",
            text: `El jugador ${jugador.nombre} con el numero ${jugador.numero} ha sido agregado`,
            icon: "success",
            confirmButtonText: 'Listo',
            confirmButtonColor: "green",
            timer: 5000,
            imageUrl: `Caratula/${jugador.imagen}`,
            imageHeight: 200
        })

    } else {
        
        Swal.fire({
            title: `Jugador existente`,
            text: `EL jugador ${jugadorAgregado.nombre} con el numero ${jugadorAgregado.numero} ya esta como inicialista`,
            icon: "info",
            timer: 4000,

        })
    }
}

function agregarJugadorAlineacion(array) {
    modalCarrito.innerHTML = ""
    array.forEach((jugadorEnAlineacion) => {

        modalCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${jugadorEnAlineacion.id}" style="max-width: 540px;">
                <img class="card-img-top" height="300px" src="Caratula/${jugadorEnAlineacion.imagen}" alt="">
                <div class="card-body">
                        <h4 class="card-title">${jugadorEnAlineacion.nombre}</h4>
                    
                        <p class="card-text"> Nacionalidad: ${jugadorEnAlineacion.nacionalidad}</p> 
                        <p class="card-text">Edad: ${jugadorEnAlineacion.edad}</p> 
                        <p class="card-text">Posicion: ${jugadorEnAlineacion.posicion}</p>
                        <p class="card-text">Numero: ${jugadorEnAlineacion.numero}</p>
                        <button class= "btn btn-danger" id="botonEliminar${jugadorEnAlineacion.id}"><i class="fas fa-trash-alt"></i></button>
                </div>    
            </div>
        `
    })

    array.forEach((jugadorEnAlineacion)=> {
        
        document.getElementById(`botonEliminar${jugadorEnAlineacion.id}`).addEventListener("click", ()=>{
            
            let cardProducto = document.getElementById(`productoCarrito${jugadorEnAlineacion.id}`)
            cardProducto.remove()
            
            let productoEliminar = array.find((jugador)=>jugador.id == jugadorEnAlineacion.id)
            console.log(productoEliminar)
            let posicion = array.indexOf(productoEliminar)
            array.splice(posicion,1)
            localStorage.setItem("carrito", JSON.stringify(array))
            calcularTotal(array)
        })

    })

    calcularTotal(array)
}
function calcularTotal(array){
    let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.id ,0)
    total == 0 ? precioTotal.innerHTML = `No hay productos en el carrito` :
    precioTotal.innerHTML = `EL total de jugadores en la alineacion es: <strong>${total = array.length}</strong>`

}

//Eventos

buscador.addEventListener("input", () => {
    buscarNombreJugador(buscador.value.toLowerCase(), ColegialesFC)
})

verEquipobtn.addEventListener("click", () => {
    mostrarjugadores(ColegialesFC)
})

ocultarlEquipobtn.addEventListener("click", () => {
    equipo.innerHTML = ""
})

guardarjugadorBtn.addEventListener("click", () => {
    agregarJugador(ColegialesFC)
})

selectOrden.addEventListener("change", () => {
    console.log(bucadorFiltro.value)
    if (bucadorFiltro.value == 1) {
        filtroMenorMayor(ColegialesFC)
    } else if (bucadorFiltro.value == 2) {
        filtroMayorMenor(ColegialesFC)
    } else if (bucadorFiltro.value == 3) {
        filtroAZ(ColegialesFC)
    } else {
        mostrarjugadores(ColegialesFC)
    }
})

botonCarrito.addEventListener("click", ()=>{
    agregarJugadorAlineacion(jugadorEnAlineacion)
})

setTimeout(()=>{
    loaderTexto.innerHTML = ""
    loader.remove()
    mostrarjugadores(ColegialesFC)
}, 3000)
