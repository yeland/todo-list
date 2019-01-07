function checkEnter() {
  const todoString = document.getElementById('add').value;
  return event.keyCode == 13 && todoString.length;
}
function getState() {
  const activeColor = document.getElementById('active').style.background;
  const completedColor = document.getElementById('completed').style.background;
  if (activeColor === 'white') {
    return 'active';
  }
  if (completedColor === 'white') {
    return 'completed';
  }
  return 'all';
}
function getTodo(state) {
  const todoString = document.getElementById('add').value;
  if (!todoString.length) {
    return -1;
  }
  if (state == 'all') {
    state = 'active';
  }
  const todo = new Todo(0, todoString, state);
  return todo;
}
function showTodosByState(todos, state) {
  showClear(todos);
  let seletedTodos = [];
  switch (state) {
    case 'active':
      seletedTodos = chooseActive(todos);
      break;
    case 'completed':
      seletedTodos = chooseCompleted(todos);
      break;
    default:
      seletedTodos = todos;
      break;
  }
  showTodos(seletedTodos);
}
function showClear(todos) {
  activeTodos = chooseActive(todos);
  completedTodos = chooseCompleted(todos);
  if (activeTodos.length > 1 || completedTodos.length) {
    document.getElementById('clear').style.visibility = 'visible';
  } else {
    document.getElementById('clear').style.visibility = 'hidden';
  }
}
function showTodos(todos) {
  if (todos.length) {
    let todosLabel = generateLabel(todos);
    document.getElementById('list').innerHTML = `<ul>${todosLabel.join('\n')}</ul>`
  } else {
    document.getElementById('list').innerHTML = '';
  }
  update(todos);
}

function generateLabel(todos) {
  return todos.map(todo =>
    `<li class=${todo.state} id=${todo.id} onmouseover="showDelete(this)" onmouseleave="hiddenDelete(this)" onclick="setCompleted(this)">
        ${todo.content}
        <button class="delete" type="button" onclick="deleteTodo(this)">×</button>
    </li>`);
}

function update(todos) {
  document.getElementById('items').innerHTML = `left items:${todos.length}`;
  document.getElementById('add').value = '';
}
function chooseActive(todos) {
  return todos.filter(todo => todo.state === 'active');
}
function chooseCompleted(todos) {
  return todos.filter(todo => todo.state === 'completed');
}
function buttonInit() {
  document.getElementById('all').style.background = '#e0bb53';
  document.getElementById('active').style.background = '#e0bb53';
  document.getElementById('completed').style.background = '#e0bb53';
}
function changeState(todos, ele) {
  return todos.map(todo => {
    if (todo.id === parseInt(ele.id)) {
      todo.state = 'completed';
    }
    return todo;
  })
}
function deleteFromTodos(todos, ele) {
  return todos.filter(todo => todo.id != parseInt(ele.parentNode.id));
}
function clearFromTodos(todos) {
  return todos.filter(todo => todo.state != 'completed');
}