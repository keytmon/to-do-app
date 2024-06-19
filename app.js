document.addEventListener("DOMContentLoaded", function (){
    const toDoList = document.querySelector('.todo-items-container');
    const toDoForm = document.querySelector('.todo-form');
    const toDoInput = document.querySelector('.create-todo-input');
    const clearList = document.querySelector('.clear-todo');
    const allToDos = document.querySelector('.show-all');
    const activeToDos = document.querySelector('.show-active');
    const completedToDos = document.querySelector('.show-completed');
    const toDoFilterItem = document.querySelector('.view-parameters');

    let toDos = [];
    let active = [];
    let completed = [];
    let filterType = 'all';

    const createEmptyElement = () => {
        const emptyListElement = document.querySelector('.todo-empty');
        if (toDoList.children.length === 0) {
            const emptyList = document.createElement('div');
            emptyList.innerHTML = `
            <p>You don\`t have any tasks now<br>Add something for begin!</p>
            <img src="images/todo-empty.png" alt="">
            `
            emptyList.classList.add('todo-empty');
            toDoList.appendChild(emptyList);
        } else if (emptyListElement) {
            emptyListElement.remove();
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

    const getToDoItems = (toDos, onCheck) => toDos.map((todo) => {

        const toDoItem = document.createElement('div');
        toDoItem.innerHTML = `
            <p>${todo.name}</p>
            <button type="button" class="todo-completed ${todo.isToDoChecked ? "checked": ""}"></button>`
        toDoItem.classList.add("todo-item", todo.isToDoChecked ? "checked" : "active")
        const completeButton = toDoList.querySelector('.todo-completed');
        toDoItem.id = todo.id;

        toDoItem.addEventListener("click", () => {
            doChecked(toDoItem, completeButton);
            toDos = toggleChecked(todo, toDos);
            onCheck(todo);
            addToDos();
            toDoCounter();
            saveData();
        });
        return toDoItem;
    })

    const addToDos = () => {
        const filteredToDos = getFilteredToDos(filterType, toDos);
        const items = getToDoItems(filteredToDos, (todo) => toDos = toggleChecked(todo, toDos));
        if (items.length) {
            toDoList.innerHTML = '';
            return toDoList.append(...items);
        } else {
            createEmptyElement();
        }
    }

    const createToDo = (e) => {
        e.preventDefault();

        const toDoInputValue = toDoInput.value;
        const toDosData = { name: toDoInputValue.trim(), isToDoChecked: false, id: Date.now()};

        if(toDosData.name === ''){
            alert("Write something");
            toDoInput.value = "";
            return toDos;
        }

        toDoInput.value = "";
        toDoInput.focus();

        toDos.unshift(toDosData);
        addToDos();
        toDoCounter();
        saveData();
    }

    const toggleChecked = (todo, toDos) => toDos.map((toDoItem) =>
        toDoItem.id === todo.id ?
            {
                ...todo,
                isToDoChecked: !todo.isToDoChecked
            }
            : toDoItem
    )


    const doChecked = (todo, button) => {
        button = todo.querySelector('.todo-completed');

        if (todo.classList.contains("checked")) {
            button.classList.remove("checked");
            todo.classList.remove("checked");
            todo.classList.add("active");
        } else {
            button.classList.add("checked");
            todo.classList.remove("active");
            todo.classList.add("checked");
        }
    }

    const getFilteredToDos = (filterType, toDos) => {
        createEmptyElement();
        switch (filterType) {
            case 'active':
                showActive();
                toDoList.innerHTML = '';
                return toDos.filter((todo) => !todo.isToDoChecked)
            case 'completed':
                showCompleted();
                toDoList.innerHTML = '';
                return toDos.filter((todo) => todo.isToDoChecked)
            default:
                showAll();
                return toDos;
        }
    }

    const getFilterType = () => {
        toDoFilterItem.addEventListener('click', (e) => {
            const className = e.target.classList.value.split(' ').find((className =>
                className.includes('show')));
            filterType = className?.split('-')?.[1];
            addToDos();
        })
    }

    getFilterType()

    const showActive = () => {
        if (filterType === 'active'){
            activeToDos.classList.add("active");
            completedToDos.classList.remove("active");
            allToDos.classList.remove("active");
        } else {
            activeToDos.classList.remove("active");
        }
    }

    const showCompleted = () => {
        if (filterType === 'completed'){
            completedToDos.classList.add("active");
            activeToDos.classList.remove("active");
            allToDos.classList.remove("active");
        } else {
            completedToDos.classList.remove("active");
        }
    }

    const showAll = () => {
        if (filterType === 'all'){
            allToDos.classList.add("active");
            activeToDos.classList.remove("active");
            completedToDos.classList.remove("active");
        } else {
            allToDos.classList.remove("active");
        }
    }

    const clearToDo = () => {
        const confirmData = confirm("Clear all completed todos?");
        completed = toDos.filter((todo) => todo.isToDoChecked);
        if (confirmData && toDos.length > 0) {
            toDoList.querySelectorAll('.checked').forEach((element) => element.remove());
            completed.length = 0;
            toDos = toDos.filter((todo) => !todo.isToDoChecked);
            createEmptyElement();
            toDoCounter();
        }
        saveData();
    }

    const toDoCounter = () => {
        active = toDos.filter((todo) => !todo.isToDoChecked);
        const counterContainer = document.querySelector('.todo-counter-container');
        const counter = document.createElement('div');
        counter.innerHTML = `
        <p>${active.length} active todos</p>
        `
        counter.classList.add('todo-counter');
        counterContainer.appendChild(counter);
        if (counterContainer.children.length > 1 ){
            counterContainer.innerHTML= "";
            counterContainer.appendChild(counter);
        }
    }

    toDoCounter();

    if (localStorage.getItem('todos')) {
        toDos = JSON.parse(localStorage.getItem('todos'))
        toDos.forEach(() => {
            addToDos();
            toDoCounter();
        })
    }
    const saveData = () => {
        localStorage.setItem('todos', JSON.stringify(toDos));
    }

    themeSwitch.addEventListener("click", changeTheme);
    toDoForm.addEventListener("submit", createToDo);
    clearList.addEventListener("click", clearToDo);
})