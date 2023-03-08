import { reload } from "../script.js";

let baseURL = "http://localhost:3000";
export function getData() {
    fetch(baseURL + "/todos/")
        .then((res) => res.json())
        .then((res) => reload(res));
}

export function postData(data) {
    fetch(baseURL + "/todos", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                getData();
            }
        })
        .catch((err) => console.log(err));
}

export function updateData(id, body) {
    console.log(id);
    fetch(baseURL + "/todos" + id, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json",
        },
    }).then((res) => res.json()).then((res) => {
        if (res.ok) {
            getData();
        } else {
            console.log('err');
        }
        closeModal();
    });
}

updateData()

export function deleteData(id) {
    fetch(baseURL + "/todos/" + id, {
        method: "DELETE",
    })
}

export function closeModal(modal, modalBG) {
    if (modal && modalBG) {
        modal.style.opacity = 0;
        modalBG.style.opacity = 0;
        modal.style.scale = 0.1;
        setTimeout(() => {
            modal.style.display = "none";
            modalBG.style.display = "none";
        }, 200);
    }
}

export function openModal(modal, modalBG) {
    modal.style.opacity = 1;
    modalBG.style.opacity = 1;
    modal.style.scale = 1;
    setTimeout(() => {
        modal.style.display = "block";
        modalBG.style.display = "block";
    }, 200);
}