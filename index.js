// const todo = require('./data.json');
let todoListObject = [];
const randomIdObject = {};
let state = 0;

const input = document.getElementById('todo-adder-text');
const counterBase = document.getElementsByClassName('counter-base')[0];
const clearCompleted = document.querySelector('.clear-completed');
const counterBaseCount = document.getElementById('counter-base-count');
const topCheckbox = document.getElementById('top-checkbox');
const todo = document.querySelector('.todo-list');
const activeState = document.querySelector('.active');
const allState = document.querySelector('.selected');
const completedState = document.querySelector('.completed-state');

allState.style.border = '1px solid rgba(175, 47, 47, 0.1)';

activeState.addEventListener('click', (e) => {
    state = 1;
    while (todo.firstChild) {
        todo.removeChild(todo.firstChild);
    }
    todoListObject.filter(curr => curr.status === '').forEach((curr) => {
        createTodo(curr);
    });
    completedState.style.border = '1px solid transparent';
    allState.style.border = '1px solid transparent';
    e.target.style.border = '1px solid rgba(175, 47, 47, 0.1)';
});

allState.addEventListener('click', (e) => {
    state = 0;
    while (todo.firstChild) {
        todo.removeChild(todo.firstChild);
    }
    todoListObject.forEach((curr) => {
        createTodo(curr);
    })
    completedState.style.border = '1px solid transparent';
    activeState.style.border = '1px solid transparent';
    e.target.style.border = '1px solid rgba(175, 47, 47, 0.1)';

});


completedState.addEventListener('click', (e) => {
    state = 2;
    while (todo.firstChild) {
        todo.removeChild(todo.firstChild);
    }
    todoListObject.filter(curr => curr.status === 'completed').forEach((curr) => {
        createTodo(curr);
    })
    allState.style.border = '1px solid transparent';
    activeState.style.border = '1px solid transparent';
    e.target.style.border = '1px solid rgba(175, 47, 47, 0.1)';
});




topCheckbox.addEventListener('click', function (e) {
    if (e.target.checked === true) {
        todoListObject.forEach((curr, index) => {
            todoListObject[index].status = 'completed';
        });
    } else {
        todoListObject.forEach((curr, index) => {
            todoListObject[index].status = '';
        });
    }
    while (todo.firstChild) {
        todo.removeChild(todo.firstChild);
    }
    todoListObject.forEach((curr) => {
        createTodo(curr);
    })
    counterChanger();
})

clearCompleted.addEventListener('click', function (e) {
    todoListObject = todoListObject.filter((curr) => {
        return curr.status === '';
    });
    if (state === 2) {
        while (todo.firstChild) {
            todo.removeChild(todo.firstChild);
        }
        todoListObject.filter(curr => curr.status === 'completed').forEach((curr) => {
            createTodo(curr);
        })
    } else if (state === 1) {
        while (todo.firstChild) {
            todo.removeChild(todo.firstChild);
        }
        todoListObject.filter(curr => curr.status === '').forEach((curr) => {
            createTodo(curr);
        });
    } else {
        while (todo.firstChild) {
            todo.removeChild(todo.firstChild);
        }
        todoListObject.forEach((curr) => {
            createTodo(curr);
        })
    }
    if (todoListObject.length === 0) {
        counterBase.style.visibility = 'hidden';
    }
});



function counterChanger() {
    let num = todoListObject.reduce((acc, curr) => {
        if (curr.status === '') {
            acc += 1
        }
        return acc;
    }, 0)
    counterBaseCount.textContent = `${num} item left`;
}




input.addEventListener('keydown', (e) => {
    let data = input.value.trim();
    if (e.key === 'Enter' && data != '') {
        const object = {};
        object.data = input.value;
        object.status = '';
        let randomId = Math.floor(Math.random() * 1000);
        object.id = randomId;
        randomIdObject[randomId] = object;
        todoListObject.push(object);
        createTodo(object);
        counterChanger();
        input.value = '';
        if (todoListObject.length !== 0) {
            counterBase.style.visibility = 'initial';
        }
    }
});

input.addEventListener('focusout', (e) => {
    // const data = input.value.trim();
    let data = input.value.trim();
    if (data != '') {
        const object = {};
        object.data = input.value;
        object.status = '';
        let randomId = Math.floor(Math.random() * 1000);
        object.id = randomId;
        randomIdObject[randomId] = object;
        todoListObject.push(object);
        createTodo(object);
        counterChanger();
        input.value = '';
        if (todoListObject.length !== 0) {
            counterBase.style.visibility = 'initial';
        } else {
            counterBase.style.visibility = 'hidden';
        }
    }
});




function createTodo(obj) {
    // const todo = document.querySelector('.todo-list');
    console.log(state);
    const li = document.createElement('li');
    li.setAttribute('id', obj.id);
    if (obj.status == 'completed') {
        li.classList.add('completed');
    }

    const divView = document.createElement('div');
    divView.classList.add('view');
    divView.setAttribute('id', `view` + obj.id);


    const inputToggle = document.createElement('input');
    inputToggle.type = 'checkbox';
    if (obj.status == 'completed') {
        inputToggle.checked = 'true';
    }
    inputToggle.classList.add('toggle');
    inputToggle.setAttribute('id', `inputtoggle` + obj.id);

    inputToggle.addEventListener('click', function (e) {
        if (e.target.checked === true) {
            li.classList.add('completed');
            todoListObject.forEach((curr, index) => {
                if (curr.id === obj.id) {
                    todoListObject[index].status = 'completed';
                }
            });
            counterChanger();
        } else {
            li.classList.remove('completed');
            todoListObject.forEach((curr, index) => {
                if (curr.id === obj.id) {
                    todoListObject[index].status = '';
                }
            });
            counterChanger();
        }
    })

    const divInsideList = document.createElement('div');
    divInsideList.classList.add('inside-list');

    const label = document.createElement('label');
    label.textContent = obj.data;

    const button = document.createElement('button');
    button.textContent = 'X';
    button.setAttribute('id', `button` + obj.id);
    button.addEventListener('click', function () {
        obj.deleted = 'yes'
        todoListObject = todoListObject.filter((curr) => {
            return (curr.hasOwnProperty('deleted') === false);
        })
        li.remove();
        if (todoListObject.length === 0) {
            counterBase.style.visibility = 'hidden';
        }
        counterChanger();
    })


    divInsideList.appendChild(label);
    divInsideList.appendChild(button);

    divView.appendChild(inputToggle);
    divView.appendChild(divInsideList);

    li.appendChild(divView);
    if (state === 0) {
        todo.appendChild(li);
    } else if (state === 1) {
        if (obj.status === '') {
            todo.appendChild(li);
        }
    } else if (state === 2) {
        if (obj.status === 'completed') {
            todo.appendChild(li);
        }
    }
    li.addEventListener('mouseenter', function () {
        const buttonInside = document.getElementById(`button` + obj.id);
        console.log(li);
        if (buttonInside) {
            buttonInside.style.visibility = 'visible';
        }
    });

    li.addEventListener('mouseleave', function () {
        const buttonInside = document.getElementById(`button` + obj.id);
        if (buttonInside) {
            buttonInside.style.visibility = 'hidden';
        }
    });

    li.addEventListener('dblclick', function () {

        const div = document.createElement('div');
        div.className = 'editclass';
        const nestedDiv = document.createElement('div');
        div.appendChild(nestedDiv);
        const editInput = document.createElement('input');
        editInput.setAttribute('type', 'text');
        editInput.setAttribute('value', obj.data);
        editInput.setAttribute('autofocus', '');
        div.appendChild(editInput);

        editInput.addEventListener('blur', function (e) {
            let data = e.target.value.trim();
            if (data === '') {
                obj.data = '';
                todoListObject = todoListObject.filter((curr) => {
                    return curr.data !== '';
                })
                while (todo.firstChild) {
                    todo.removeChild(todo.firstChild);
                }
                todoListObject.forEach((curr) => {
                    createTodo(curr);
                })
                counterChanger();
                if (todoListObject.length === 0) {
                    counterBase.style.visibility = 'hidden';
                }
            } else {
                obj.data = e.target.value;
                while (todo.firstChild) {
                    todo.removeChild(todo.firstChild);
                }
                todoListObject.forEach((curr) => {
                    createTodo(curr);
                })
                counterChanger();
            }
        })

        editInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                let data = e.target.value.trim();
                if (data === '') {
                    obj.data = '';
                    todoListObject = todoListObject.filter((curr) => {
                        return curr.data !== '';
                    })
                    while (todo.firstChild) {
                        todo.removeChild(todo.firstChild);
                    }
                    todoListObject.forEach((curr) => {
                        createTodo(curr);
                    })
                    counterChanger();
                    if (todoListObject.length === 0) {
                        counterBase.style.visibility = 'hidden';
                    }
                } else {
                    obj.data = e.target.value;
                    while (todo.firstChild) {
                        todo.removeChild(todo.firstChild);
                    }
                    todoListObject.forEach((curr) => {
                        createTodo(curr);
                    })
                    counterChanger();
                }
            }
        })


        while (li.firstChild) {
            li.removeChild(li.firstChild);
        }
        li.appendChild(div);
        editInput.focus();
    })

}

