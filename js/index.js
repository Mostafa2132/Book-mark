var sitename = document.getElementById("NameInput");
var visit = document.getElementById("URLInput");
let btn = document.getElementById("btn");

let arr = [];
if (localStorage.getItem("books") !== null) {
  arr = JSON.parse(localStorage.getItem("books"));
  displaydata();
}

function addbook() {
  if (
    sitename.classList.contains("is-valid") &&
    visit.classList.contains("is-valid")
  ) {
    let book = {
      name: sitename.value,
      link: visit.value,
    };

    arr.push(book);
    sitename.classList.remove("is-valid");
    sitename.classList.remove("is-invalid");
    visit.classList.remove("is-valid");
    visit.classList.remove("is-invalid");

    if (sitename.value != "" && visit.value != "") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: " add successfully",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "please enter inputs",
        icon: "error",
        confirmButtonText: "Close",
      });
    }

    clearData();
    localStorage.setItem("books", JSON.stringify(arr));
    displaydata();
  } else {
    Swal.fire({
      title: "Error!",
      text: "please enter inputs",
      icon: "error",
      confirmButtonText: "Close",
    });
  }
}
function clearData() {
  sitename.value = null;
  visit.value = null;
}

function displaydata() {
  let x = "";

  for (let i = 0; i < arr.length; i++) {
    x += `        <tbody class="fs-5">
              <tr>
                <th scope="row">${i + 1}</th>
                <td class="fw-bold fs-5">${arr[i].name}</td>
                <td ><button onclick=GoPage(${i})  id="myButton" class="btn fs-5 btn-success px-4"> <i class="fa-regular me-2 fa-eye"></i> Visit</button></td>
                <td><button  onclick=DleteBook(${i}) class="btn fs-5 btn-danger px-4"> <i class="fa-solid me-2 fa-trash-can"></i> Dlete</button></td>
              
              </tr>
       
            </tbody>
         `;
  }

  document.getElementById("inner").innerHTML = x;
}

function DleteBook(e) {
  arr.splice(e, 1);
  localStorage.setItem("books", JSON.stringify(arr));
  displaydata();
}

function GoPage(e) {
  let go = arr[e].link;
  open(go);
}

function vlidate(ele) {
  let regx = {
    NameInput: /^\w{3,8} ?([a-z]{3,8})?$/gm,
    URLInput:
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9] \.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|w ww\.[a-zA-Z0-9]+\.[^\s]{2,})/gm,
  };

  if (regx[ele.id].test(ele.value) == true) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    ele.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");
    ele.nextElementSibling.classList.replace("d-none", "d-block");
  }
}
