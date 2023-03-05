let form = document.forms.add_task_form;
let container = document.querySelector(".container");
let modal = document.querySelector('.modal')
let modalBG = document.querySelector('.modal__bg')
let closeBtn = document.querySelector('.close-btn')
let input = document.querySelector('.modal__input')
let change = document.querySelector('.modal__btn')
let baseURL = "http://localhost:3000"


function getData() {
	fetch(baseURL + "/todos")
		.then((res) => res.json())
		.then((res) => reload(res))
}
getData()

function postData(data, h3) {
	fetch(baseURL + "/todos", {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" }
	})
		.then(res => {
			if (res.status === 200 || res.status === 201) {
				getData()
			}
		})
		.catch(err => console.log(err))
}




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
	let { id, time, task } = todo

	if (id && time && task) {
		postData(todo)
	}
};

const reload = (arr) => {
	container.innerHTML = ""

	for (let item of arr) {
		let box = document.createElement("div");
		let img = document.createElement("img");
		let img2 = document.createElement("img")
		let h3 = document.createElement("h3");
		let span = document.createElement("span");

		box.classList.add("box");
		img.classList.add("img");
		h3.classList.add("h3");
		span.classList.add("span");
		img2.classList.add("img2")

		h3.innerHTML = item.task;
		img.src = "./img/close.svg";
		img2.src = "./img/edit-svgrepo-com.svg";
		img2.setAttribute('width', '20px')
		img2.setAttribute('height', '20px')
		span.innerHTML = item.time;

		container.append(box);
		box.append(img, h3, span, img2);

		if (item.completed === true) {
			h3.classList.add('box-line')
		} else {
			h3.classList.remove('box-line')
		}

		h3.onclick = () => {
			h3.classList.toggle('box-line')
			if (h3.classList.contains('box-line')) {
				item.completed = true
			} else {
				item.completed = false
			}
		}

		change.onclick = () => {
			modal.style.opacity = 0
			modalBG.style.opacity = 0
			modal.style.scale = .1
			setTimeout(() => {
				modal.style.display = 'none'
				modalBG.style.display = 'none'
			}, 200)

			fetch(baseURL + "/todos/" + item.id, {
				method: "PUT",
			}).then(res => {
				if (res.status === 200 || res.status === 201) {
					h3.innerHTML = input.value
				}
			}).catch(err => console.log(err))

		}

		img.onclick = () => {

			fetch(baseURL + "/todos/" + item.id, {
				method: "DELETE"
			}).then(res => {
				if (res.status === 200 || res.status === 201) {
					box.remove()
				}
			})
		}

		function openClose(arr, func) {
			arr.onclick = () => {
				func()
			}
		}

		openClose(img2, openModal)
		openClose(closeBtn, closeModal)

		function openModal() {
			modal.style.opacity = 1
			modalBG.style.opacity = 1
			modal.style.scale = 1
			setTimeout(() => {
				modal.style.display = 'block'
				modalBG.style.display = 'block'

			}, 100)
		}

		function closeModal() {
			modal.style.opacity = 0
			modalBG.style.opacity = 0
			modal.style.scale = .1
			setTimeout(() => {
				modal.style.display = 'none'
				modalBG.style.display = 'none'
			}, 200)
		}
	};
}