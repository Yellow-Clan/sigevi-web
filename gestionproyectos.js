import {
  onGetTasks,
  saveTask,
  deleteTask,
  getTask,
  updateTask,
  getTasks,
  auth, //auth
} from "./firebase.js";


// Seleccionamos el formulario principal de registro
const taskForm = document.getElementById("task-form");

// Traemos el 
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";


// DOMContentLoaded es el evento que ejecuta algo cuando la web cargue 
window.addEventListener("DOMContentLoaded", async (e) => {
  // const querySnapshot = await getTasks();
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // });



  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const project = doc.data();

      tasksContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary" style=" background-color: #ffffffad; backdrop-filter: blur(15px); ">
    <h3 class="h5">Proyecto: ${project.projectname}</h3>
    <p>Descripción: ${project.infproject}</p>
    <p>Fecha Inicio: ${project.feini}</p>
    <p>Fecha Fin: ${project.fefin}</p>


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


    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteTask(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );




    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const project = doc.data();
          taskForm["projectname"].value = project.projectname;
          taskForm["infproject"].value = project.infproject;
          taskForm["feini"].value = project.feini;
          taskForm["fefin"].value = project.fefin;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Actualizar";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});


// el evento submit cuando se envie algo del formulario 
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault(); //Cancela refrescar pagina

// taskForm contiene nuestro formulario y lo trataremos como un objeto
// y extraeremos sus otros inputs elementos {title} y {description}
  const projectname = taskForm["projectname"];
  const infproject = taskForm["infproject"];
  const feini = taskForm["feini"];
  const fefin = taskForm["fefin"];

  // const description = taskForm["task-description"];

  try {
    if (!editStatus) {
      await saveTask(projectname.value, infproject.value, feini.value, fefin.value);
    } else {
      await updateTask(id, {
        projectname: projectname.value,
        infproject: infproject.value,
        feini: feini.value, 
        fefin: fefin.value,
      });

      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Guardar";
    }

    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
});
