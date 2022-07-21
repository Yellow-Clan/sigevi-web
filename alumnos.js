import {
  onGetAlumns,
  saveAlumn,
  deleteAlumn,
  getAlumn,
  updateAlumn,
  getAlumns,

} from "./fbc/fb-alumnos.js";


// Seleccionamos el formulario principal de registro
const alumnForm = document.getElementById("alumn-form");

// Traemos el 
const alumnContainer = document.getElementById("alumn-container");

let editStatus = false;
let id = "";


// DOMContentLoaded es el evento que ejecuta algo cuando la web cargue 
window.addEventListener("DOMContentLoaded", async (e) => {
  // const querySnapshot = await getTasks();
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // });



  onGetAlumns((querySnapshot) => {
    alumnContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const alumn = doc.data();

      alumnContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary" style=" background-color: #ffffffad; backdrop-filter: blur(15px); ">
    <h3 class="h5">Nombres: ${alumn.alumname}</h3>
    <p>Ciclo: ${alumn.alumnciclo}</p>
    <p>Codigo Universitario: ${alumn.codalumno}</p>

    <div>
      <button class="btn btn-primary btn-edit" data-id="${doc.id}">
         Editar
      </button>

      <button class="btn btn-danger btn-delete" data-id="${doc.id}">
        X Eliminar
      </button>

    </div>
  </div>`;
    });


    const btnsDelete = alumnContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteAlumn(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );




    const btnsEdit = alumnContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getAlumn(e.target.dataset.id);
          const alumn = doc.data();
          alumnForm["alumname"].value = alumn.alumname;
          alumnForm["alumnciclo"].value = alumn.alumnciclo;
          alumnForm["codalumno"].value = alumn.codalumno;
         

          editStatus = true;
          id = doc.id;
          alumnForm["btn-alumn-form"].innerText = "Actualizar";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});


// el evento submit cuando se envie algo del formulario 
alumnForm.addEventListener("submit", async (e) => {
  e.preventDefault(); //Cancela refrescar pagina

// alumnForm contiene nuestro formulario y lo trataremos como un objeto
// y extraeremos sus otros inputs elementos {title} y {description}
  const alumname = alumnForm["alumname"];
  const alumnciclo = alumnForm["alumnciclo"];
  const codalumno = alumnForm["codalumno"];

  // const description = alumnForm["task-description"];

  try {
    if (!editStatus) {
      await saveAlumn(alumname.value, alumnciclo.value, codalumno.value);
    } else {
      await updateAlumn(id, {
        alumname: alumname.value,
        alumnciclo: alumnciclo.value,
        codalumno: codalumno.value,
      });

      editStatus = false;
      id = "";
      alumnForm["btn-alumn-form"].innerText = "Guardar";
    }

    alumnForm.reset();
    alumname.focus();
  } catch (error) {
    console.log(error);
  }
});
