{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => { // funkcja dodająca zadania
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };
    // tu coś takiego ale lepiej to ogarnąć do zrobienia // funkcja zaznaczająca wszystkie zadania jako ukończone
    const allDoneTasks = (taskIndex) => { 
        !tasks[taskIndex].done ?  tasks[taskIndex].done : tasks[taskIndex].done;
        render();
    };

    const removeTask = (taskIndex) => { // funkcja usuwająca zadania
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toogleTaskDone = (taskIndex) => { // funkcja która przypisuje zadania do done albo nie
        //tasks = tasks.map do zrobienia
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const toogleHideTaskDone = (taskIndex) => { //tu też będzie map pewnie do zrobienia
        if (tasks[taskIndex].done) {            //funkcja która ukrywa/odkrywa task -                                            w trakcie prac
            hideDoneTasks[taskIndex].done = !hideDoneTasks[taskIndex].done;
        }
        render();
    };

    const bindRemoveEvents = () => {    //funkcja usuwająca zadanie
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => { // funkcja kliknięcia, i znajdująca task po indeksie która przyjmuje funkcje przypisującą zadania do done albo nie.
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toogleDoneButton, index) => {
            toogleDoneButton.addEventListener("click", () => {
                toogleTaskDone(index);
            });
        });
    };

    const bindButtonsEvents = () => {
        if (tasks > 0){
            const doneAllTasks = document.querySelector(".js-allDoneButton");
            doneAllTasks.addEventListener("click", () => {
            console.log("mam przycisk");
            });
        }; 
    };
        //doneAllTasks((doneAllTasks, task) => {
        //     doneAllTasks.addEventListener("click", () => {
        //         allDoneTasks(task);
        //     console.log("mam przycisk");
        //     });
        // });
     //funkcje kliknięcia, jedna powinna przyjmować zaznaczenie wszystkiego na done a druga funkcji ukrywania, zablokować przycisk jak wszystko jest done        do zrobienia

    const renderTasks = () => {   //funkcja renderująca task - jak jest coś nowego go dodaje, jak nie nic nie robi
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class = "list">
            <button class = "js-done list__button--done">
            ${task.done ? "✔" : ""}
            </button>
            <span class = "list__item${task.done ? " list__item--done" : ""}">
            ${task.content}
            </span>
            <button class = "js-remove list__button--remove">🗑</button>
            </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {  // funkcja dodająca przyciski w zależności czy jest jakieś zadanie czy nie
        let htmlString = tasks < 1 ?  "" :
        `<button class = "section__button js-hideButton"> Ukryj ukończone </button> 
        <button class = "section__button js-allDoneButton"> Ukończ wszystkie </button>`;
        document.querySelector(".js-buttons").innerHTML = htmlString;
    };

    const render = () => { // funkcja render - odświeżająca jakby wszystko przy każdym wykonaniu czegoś
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => { // funkcja sprawdzająca czy dane zadanie zawiera jakies znaki, oczyszcza-trim daje ona też focus, i wywoluje funkcje dzieki ktorej dodaje juz "dopieszczone" zadanie
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();
        newTaskElement.focus();

        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);
        newTaskElement.value = "";
    };

    const init = () => { // funkcja początkowa która ogarnia form i dzięki temu wszystko rederuje przyjmując render
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}

