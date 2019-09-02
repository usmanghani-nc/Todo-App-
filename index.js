const btnAdd = document.querySelector("#btnAdd");
const input = document.querySelector("#input");
const error = document.querySelector("#error");
const close = document.querySelector("#close");



btnAdd.addEventListener("click", (e) => {
    console.log(error);
    e.preventDefault();
    if (input.value === "" || input.value === null) {

        setTimeout(() => {
            error.classList.add('fadeIn');
            error.style.display = 'block';
        }, 500);

    } else {
        dom(input.value);
        input.value = "";
    }
});



close.addEventListener("click", (e) => {
    error.style.display = 'none';
});



function dom(text) {
    const ul = document.querySelector("#ul");
    const todos = `<li id="li"><button id="done"><i class="far fa-check-square"></i></button><p class="p">${text}</p> <div class="de-btn"><button id="btnDelet"><i class="fab fa-xing-square"></i></button><button id="btnEditt" class="btnEditt"><i class="fas fa-edit"></i></button></div></li> `;
    ul.insertAdjacentHTML("afterbegin", todos);

    // Delet fucntion
    const delet = document.querySelector("#btnDelet");
    delet.addEventListener("click", domDelet);

    // Editable function
    const edit = document.querySelector("#btnEditt");
    edit.addEventListener("click", domEdit);

    // Item Done Fucntion
    const done = document.querySelector('#done');
    done.addEventListener("click", itemCompelet);

}


function itemCompelet(e) {
    let item = e.target;
    let line = item.nextSibling;
    let li = item.parentNode;
    console.log(li);
    if (!item.classList.contains('active')) {
        item.innerHTML = `<i class="fas fa-check-circle"></i>`
        item.classList.add('active');
        line.classList.add('compelet');
        li.classList.add('border');
    } else {
        item.innerHTML = `<i class="far fa-check-square"></i>`;
        item.classList.remove('active');
        line.classList.remove('compelet');
        li.classList.remove('border');
    }

}

function contentEditable(node, state) {
    if (state) {
        node.setAttribute("contenteditable", true);
    } else {
        node.setAttribute("contenteditable", false);
    }
}

function domEdit(e) {

    const lis = document.querySelectorAll('#li');
    let target = e.target;
    let li = target.parentNode.parentNode;
    let childe = li.firstChild.nextSibling;
    // let id = target.getAttribute("id");
    let state = true;
    console.log(e.target, childe);

    lis.forEach(li => {
        li.setAttribute("contenteditable", false);
        contentEditable(childe, state);
    });

    if (e.target.classList.contains('btnEditt')) {
        e.target.innerHTML = `<i class="fas fa-pencil-alt"></i>`;
        e.target.classList.remove('btnEditt');
        e.target.classList.add('active');

    } else if (!e.target.classList.contains('btnEditt')) {
        e.target.innerHTML = `<i class="fas fa-edit"></i>`;
        e.target.classList.add('btnEditt');
        e.target.classList.remove('active');

        lis.forEach(li => {
            li.setAttribute("contenteditable", false);
            contentEditable(childe, !state);
        });

    }
};



function domDelet(e) {
    let target = e.target;
    let childe = target.parentNode.parentNode;
    let parent = childe.parentNode;
    console.log(childe);
    parent.removeChild(childe);
};