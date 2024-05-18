import { filtersInit } from './filters.js'
import { appendList, clearInput, getEmptyElement, getFilteredTodos, getTodoItems, toggleChecked } from './helpers.js'

document.addEventListener("DOMContentLoaded", function (){
    const listEl = document.querySelector('.todo-items-container');
    const toDoForm = document.querySelector('.todo-form');
    const toDoInput = document.querySelector('.create-todo-input');
    const clearList = document.querySelector('.clear-todo');

    let todosData = []
    let filterType = 'all'

    const addTodoItems = () => {
        const filteredTodos = getFilteredTodos(filterType, todosData)
        const items = getTodoItems(filteredTodos, (item) => todosData = toggleChecked(item, todosData))
        return items.length ? appendList(listEl, items) : appendList(listEl, [getEmptyElement()])
    }

    const createTodo = (e) => {
        e.preventDefault();
        const toDoInputValue = toDoInput.value;
        if (toDoInputValue.length <= 2) {
            return alert("Write something");
        }
        const todoData = { name: toDoInputValue, checked: false }
        todosData.unshift(todoData)
        clearInput(toDoInput)
        addTodoItems()
    }


    const clearToDo = () => {
        const confirmData = confirm("Clear all?");
        if (confirmData) {
            listEl.innerHTML = "";
            todosData.length = 0;
            addTodoItems()
        }
    }

    filtersInit((type) => {
        filterType = type
        addTodoItems()
    })
    addTodoItems()

    clearList.addEventListener("click", clearToDo);
    toDoForm.addEventListener("submit", createTodo);
})



