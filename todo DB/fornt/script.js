import { updateData, getData, deleteData, openModal } from "./modules/helpers.js";

let form = document.forms.add_task_form;
let container = document.querySelector(".container");
let modal = document.querySelector(".modal");
let modalBG = document.querySelector(".modal__bg");
let closeBtn = document.querySelector(".close-btn");
let input = document.querySelector(".modal__input");
let change = document.querySelector(".modal__btn");
let ID


form.onsubmit = (event) => {
	event.preventDefault();

	let todo = {
		id: Math.random(),
		completed: false,
		time: new Date().getHours() + ":" + new Date().getMinutes(),
	};

	let fm = new FormData(form);

	fm.forEach((value, key) => {
		todo[key] = value;
	});

	// Деструктуризация
	let {
		id,
		time,
		task
	} = todo;

	if (id && time && task) {
		postData(todo);
	}
};

export const reload = (arr) => {
	container.innerHTML = "";

	for (let item of arr) {
		let box = document.createElement("div");
		let img = document.createElement("img");
		let img2 = document.createElement("img");
		let h3 = document.createElement("h3");
		let span = document.createElement("span");

		box.classList.add("box");
		img.classList.add("img");
		h3.classList.add("h3");
		span.classList.add("span");
		img2.classList.add("img2");
		if (item.completed === true) {
			h3.classList.add("box-line");
		} else {
			h3.classList.remove("box-line");
		}


		h3.innerHTML = item.task;
		img.src = "./img/close.svg";
		img2.src = "./img/edit-svgrepo-com.svg";
		img2.setAttribute("width", "20px");
		img2.setAttribute("height", "20px");
		span.innerHTML = item.time;

		container.append(box);
		box.append(img, h3, span, img2);

		img.onclick = () => {
			deleteData(item.id).then(res => box.remove())
		};

		img2.onclick = () => {
			ID = item.id
			openModal(modal, modalBG)
		}
		h3.onclick = () => {
			updateData(item.id, {completed: !item.completed})
		}
		
	}
};

change.onclick = () => {
	updateData(ID, {task: input.value})
};

getData();