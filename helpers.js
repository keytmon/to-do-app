const doChecked = (item, button) => {
    if (item.classList.contains("checked")) {
        button.classList.remove("checked");
        item.classList.remove("checked");
    } else {
        button.classList.add("checked");
        item.classList.add("checked");
    }
}

export const getTodoItems = (todos, onCheck) => todos.map((item) => {
    const todoItem = document.createElement('div')
    todoItem.classList.add("todo-item", item.checked ? "checked" : undefined)
    todoItem.innerHTML=`
            <p>${item.name}</p>
            <button class="todo-completed ${item.checked ? "checked" : undefined}"></button>
        `
    const todoButton = todoItem.querySelector('.todo-completed');
    todoItem.addEventListener("click", () => {
        doChecked(todoItem, todoButton)
        onCheck(item)
    });
    return todoItem
})

export const toggleChecked = (item, todos) => todos.map((todoItem) =>
    todoItem.name === item.name ?
        {
            ...item,
            checked: !item.checked
        }
        : todoItem
)

export const getFilteredTodos = (type, todos) => {
    switch (type) {
        case 'active':
            return todos.filter((item) => !item.checked)
        case 'completed':
            return todos.filter((item) => item.checked)
        default:
            return todos
    }
}

export const getEmptyElement = () => {
    const element = document.createElement('div')
    element.classList.add('todo-empty')
    element.innerHTML=`
            <p>You don\`t have any tasks now<br>Add something for begin!</p>
            <img src="images/todo-empty.png" alt="">
        `
    return element
}

export const appendList = (list, items) => {
    list.innerHTML = '';
    return list.append(...items)
}

export const clearInput = (input) => {
    input.value = "";
    input.focus();
}