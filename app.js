document.addEventListener("DOMContentLoaded", function (){
    const toDoList = document.querySelector('.todo-items-container');
    const createEmptyElement = () => {
        if (toDoList.children.length === 0) {
            const emptyList = `
                <div class="todo-empty">
                    <p>You don\`t have any tasks now<br>Add something for begin!</p>
                    <img src="images/todo-empty.png" alt="">
                </div>
            `;
        toDoList.insertAdjacentHTML('afterbegin', emptyList)

        }
    }

    // createEmptyElement();

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


    const toDoForm = document.querySelector('.todo-form');
    const toDoInput = document.querySelector('.create-todo-input');
    const emptyListElement = document.querySelector('.todo-empty');
    const clearList = document.querySelector('.clear-todo');

    const todos = []
    // const allToDos = document.querySelector('.show-all');
    // const activeToDos = document.querySelector('.show-active');
    // const completedToDos = document.querySelector('.show-completed');

    const addTodoItems = () => {
        const items = todosToHtml()
        if(items.length){
            toDoList.innerHTML = '';
            return toDoList.append(...items)
        }
        return toDoList.append(getEmptyElement())
    }

    const clearInput = () => {
        toDoInput.value = "";
        toDoInput.focus();
    }

    const getEmptyElement = () => {
        const element = document.createElement('div')
        element.classList.add('todo-empty')
        element.innerHTML=`
            <p>You don\`t have any tasks now<br>Add something for begin!</p>
            <img src="images/todo-empty.png" alt="">
        `
        return element
    }

    const doChecked = (item, button) => {
        if (item.classList.contains("checked")) {
            button.classList.remove("checked");
            item.classList.remove("checked");
        } else {
            button.classList.add("checked");
            item.classList.add("checked");
        }

    }

    const todosToHtml = () => todos.map((item) => {
        const todoItem = document.createElement('div')
        todoItem.classList.add("todo-item")
        todoItem.innerHTML=`
            <p>${item}</p>
            <button class="todo-completed"></button>
        `
        const todoButton = todoItem.querySelector('.todo-completed');
        todoButton.addEventListener("click", () => doChecked(todoItem, todoButton));
        return todoItem
    })

    const correctCreateTodo = (e) => {
        e.preventDefault();
        const toDoInputValue = toDoInput.value;
        if(toDoInputValue.length <= 2){
            return alert("Write something");
        }
        todos.push(toDoInputValue)
        clearInput()
        addTodoItems()
    }

    const createToDo = (e) => {
        e.preventDefault();
        const toDoInputValue = toDoInput.value;
        console.log(toDoInputValue)

        const toDoItemHtml = `
            <div class="todo-item"> <p>${toDoInputValue}</p>
                <button type="button" class="todo-completed"></button>
            </div>
        `
        if(toDoInputValue.length >= 2){
            emptyListElement.classList.add("none")
            toDoList.insertAdjacentHTML('afterbegin', toDoItemHtml);
        } else {
            alert("Write something");
        }

        toDoInput.value = "";
        toDoInput.focus();


        const toDoItem = document.querySelector('.todo-item');
        const completeButton = document.querySelector('.todo-completed');
        // console.log(toDoItem);
        const checkedToDos = document.querySelector('.checked');

        const doChecked = () => {
            if (toDoItem.classList.contains("checked")) {
                completeButton.classList.remove("checked");
                toDoItem.classList.remove("checked");
            } else {
                completeButton.classList.add("checked");
                toDoItem.classList.add("checked");
                return checkedToDos;
            }

        }

        toDoItem.addEventListener("click", doChecked);
    }

    toDoForm.addEventListener("submit", correctCreateTodo);

    const clearToDo = () => {
        const confirmData = confirm("Clear all?");
        if(confirmData){
            toDoList.innerHTML = "";
            todos.length = 0;
            createEmptyElement();
        }
    }

    clearList.addEventListener("click", clearToDo);

    addTodoItems()
})



