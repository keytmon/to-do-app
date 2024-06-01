document.addEventListener("DOMContentLoaded", function (){
    const toDoList = document.querySelector('.todo-items-container');
    const toDoForm = document.querySelector('.todo-form');
    const toDoInput = document.querySelector('.create-todo-input');
    const clearList = document.querySelector('.clear-todo');

    const allToDos = document.querySelector('.show-all');
    // const activeToDos = document.querySelector('.show-active');
    // const completedToDos = document.querySelector('.show-completed');

    let toDos = [];

    const createEmptyElement = () => {
        const emptyListElement = document.querySelector('.todo-empty');
        if (toDos.length === 0) {
            const emptyList = document.createElement('div');
            emptyList.innerHTML = `
            <p>You don\`t have any tasks now<br>Add something for begin!</p>
            <img src="images/todo-empty.png" alt="">
            `
            emptyList.classList.add('todo-empty');
            toDoList.appendChild(emptyList);
        } else {
            emptyListElement.classList.toggle("none");
        }

    }

    createEmptyElement();

    const themeSwitch = document.querySelector('.theme-switch');
    const darkTheme = document.querySelector('.dark');
    const lightTheme = document.querySelector('.light');
    let currentTheme = lightTheme;
    const changeTheme = () => {
        if (currentTheme === darkTheme) {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
            currentTheme = lightTheme;
        } else if (currentTheme === lightTheme){
            document.body.classList.remove("light");
            document.body.classList.add("dark");
            currentTheme = darkTheme;
        }
    }

    themeSwitch.addEventListener("click", changeTheme);

    const getToDoItems = (toDos) => toDos.map((todo) => {
        const toDoItem = document.createElement('div');
        toDoItem.innerHTML = `
            <p>${todo.name}</p>
                <button type="button" class="todo-completed ${todo.isToDoChecked ? "checked": ""}"></button>`
        toDoItem.classList.add("todo-item", todo.isToDoChecked ? "checked" :
            "active")
        const completeButton = toDoList.querySelector('.todo-completed');
        toDoItem.id = todo.id;

        toDoItem.addEventListener("click", () => {
            doChecked(toDoItem, completeButton);
            toggleChecked(todo, toDos);
        });
        return toDoItem;
    })

    const addToDos = () => {
        const items = getToDoItems(toDos);
        if (items.length) {
            toDoList.innerHTML = '';
            return toDoList.append(...items);
        }
        createEmptyElement();
    }


    const createToDo = (e) => {
        e.preventDefault();

        const toDoInputValue = toDoInput.value;

        const toDosData = { name: toDoInputValue, isToDoChecked: false, id: Date.now()};

        console.log(toDoInputValue);

        if(toDosData.name === ''){
            alert("Write something");
            return toDos;
        }

        toDoInput.value = "";
        toDoInput.focus();

        toDos.unshift(toDosData);
        console.log(toDos);
        addToDos();
        toDoCounter();

    }

    toDoForm.addEventListener("submit", createToDo);

    const toggleChecked = (todo, toDos) => toDos.map((toDoItem) =>
        toDoItem.id === todo.id ?
            todo.isToDoChecked = !todo.isToDoChecked
            : todo
    )


    const doChecked = (todo, button) => {
        button = todo.querySelector('.todo-completed');

        if (todo.classList.contains("checked")) {
            button.classList.remove("checked");
            todo.classList.remove("checked");
            todo.classList.add("active");
        } else {
            console.log(button)
            button.classList.add("checked");
            todo.classList.remove("active");
            todo.classList.add("checked");
            console.log(toDos);
        }

    }


    // const showActive = () => {
    //     activeToDos.classList.toggle("active")
    //     toDos.filter(todo)
    // }

    const showAll = () => {
        allToDos.classList.add("active");
        return toDos
    }


    const clearToDo = () => {
        const confirmData = confirm("Clear all?");
        if (confirmData) {
            toDoList.innerHTML = "";
            toDos.length = 0;
            createEmptyElement();
            toDoCounter();
        }
    }

    const toDoCounter = () => {
        console.log(toDos.length);
        const counterContainer = document.querySelector('.todo-counter-container');
        const counter = document.createElement('div');
        counter.innerHTML = `
        <p>${toDos.length} active todos</p>
        `
        counter.classList.add('todo-counter');
        counterContainer.appendChild(counter);
        if (counterContainer.children.length > 1 ){
            counterContainer.innerHTML= "";
            counterContainer.appendChild(counter);
        }
    }

    toDoCounter();

    clearList.addEventListener("click", clearToDo);
    allToDos.addEventListener("click", showAll);
})
