let todos = [{
	id: 1,
	task: "Купить луну",
	time: "14:05",
	completed: true,
},
{
	id: 2,
	task: "Купить mandarin",
	time: "14:05",
	completed: false,
},
];

let form = document.forms.add_task_form;
let container = document.querySelector(".container");

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


	todos.push(todo)
	reload(todos)

	console.log(todos);
};

const reload = (arr) => {
	container.innerHTML = ""

	for (let item of arr) {
		let box = document.createElement("div");
		let img = document.createElement("img");
		let h3 = document.createElement("h3");
		let span = document.createElement("span");

		box.classList.add("box");
		img.classList.add("img");
		h3.classList.add("h3");
		span.classList.add("span");

		h3.innerHTML = item.task;
		img.src = "./close.svg";
		span.innerHTML = item.time;

		container.append(box);
		box.append(img, h3, span);

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

		img.onclick = () => {
			box.style.display = 'none'
		}
	};
}
reload(todos)

