import {
  onGetTasks,
  saveTask,
  deleteTask,
  getTask,
  updateTask,
  getTasks,
  auth, //auth
} from "./firebase.js";

// auth sign popup
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";


// Escuchamos el boton login para lanar el panel de logeo
// Auth 
const googleLogin = document.getElementById('googleLogin')

googleLogin.addEventListener('click', async() => {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  console.log("Hola: " + result.user.displayName);
  let logingnickname = document.getElementById("nickname");
  logingnickname.innerText = "Usuario: " + result.user.displayName;
})


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
      const task = doc.data();

      tasksContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
    <h3 class="h5">Proyecto: ${task.proyectName}</h3>
    <p>Descripción de proyecto: ${task.description}</p>
    <p>Telefono: ${task.creatsedAt}</p>


    <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        X Eliminar
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
         Editar
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
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Update";
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
        title: projectname.value,
        description: description.value,
      });

      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Save";
    }

    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
});
