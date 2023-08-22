//Primer Ejercicio
const btnImprimir = document.getElementById('btnImprimir');
//obtener datos de fetch
const obtenerDatos = async ()=>{
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts',{});
    const datos = await respuesta.json();
    return datos;
}
//Mostrar solo los primeros 3 valores del array
const mostrarDatos = (datos)=> {
    for(let i = 0;i<3;i++){
        console.log(datos[i]);
    }
}
//escuchar el evento click del boton imprimir valores
btnImprimir.addEventListener('click', async()=>{
    try {
        const datosAPI = await obtenerDatos();
        mostrarDatos(datosAPI);
    } catch (error) {
        console.log(error);
    }
})
//Segundo Ejercicio

const btnForm = document.getElementById('btnForm');
const form = document.getElementById('form');

//crear el formulario al dar click al boton
btnForm.addEventListener('click',(e)=>{
    e.preventDefault();
    form.innerHTML = `

    <div class="container">
      <div class="col">
        <div class="col-md-4">
          <label for="validationCustom02" class="form-label">Titulo</label>
          <input type="text" class="form-control" id="title" name="title">
        </div>
        <div class="col-md-4">
          <label for="validationCustom05" class="form-label">cuerpo</label>
          <textarea type="text" class="form-control" id="bodyForm" name="bodyForm" ></textarea>
        </div>
        </div>
        <button class='btn btn-outline-success' id='btnSend'>Enviar</button>
    </div>
    </div>

    `
    const formPost = document.getElementById('formPost');
    const btnSend = document.getElementById('btnSend');

    //escuchar el evento click del boton de enviar

    btnSend.addEventListener('click', async(e)=>{
        e.preventDefault();
        const title = document.getElementById('title').value;
        const bodyForm = document.getElementById('bodyForm').value;
    // enviar los datos a la API
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title,
                bodyForm,
            }),
        });
        const respuestaJson = await respuesta.json();
        Swal.fire({
            icon:'success',
            title: 'Creado con éxito',
        })
        formPost.reset();
        console.log(respuestaJson)
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon:'error',
            title:error,
        });
        return;
    }

    
    })
})
//Tercer Ejercicio
// Obtener una imagen a través de fetch
const obtenerImagen = async (url) => {
    try {
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) {
            throw new Error('La respuesta no fue exitosa');
        }
        // a traves del metodo blob se obtiene los datos.
        const blob = await respuesta.blob(); 
        const img = document.createElement('img'); 
        img.src = URL.createObjectURL(blob); 
        divImage.innerHTML = ''; 
        divImage.appendChild(img); 
    } catch (error) {
        console.log(error);
    }
};
// Llamar a la función para obtener una imagen
const btnImage = document.getElementById('openImage');
const divImage = document.getElementById('divImage');
btnImage.addEventListener('click', (e) => {
    //utilice el cors aniwhere para solucionar el error de cors que da fetch
    const urlImagen = 'https://cors-anywhere.herokuapp.com/https://via.placeholder.com/150'; 
    obtenerImagen(urlImagen);
    e.preventDefault();
});


