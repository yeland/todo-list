function loadTodos() {
  const todos = getFromStorage();
  if (todos != -1) {
    showByState(todos, 'all');
  }
}
function addTodo() {
  const state = getState();
  const todo = getTodo(state);
  if (todo != -1) {
    saveToStorage(todo);
  }
}
function checkEnterAddTodo() {
  const state = getState();
  const todo = getTodo(state);
  if (checkEnter()) {
    saveToStorage(todo);
    addUpdateTodos();
  }
}
function checkEnter() {
  const todoString = document.getElementById('add').value;
  return event.keyCode == 13 && todoString.length;
}
function addUpdateTodos() {
  const state = getState();
  const todos = getFromStorage();
  if (state === 'completed') {
    const completedTodos = todos.filter(todo => todo.state === 'completed');
    updateInputAndItems(completedTodos);
  } else {
    showByState(state);
  }
}
function updateTodos() {
  const state = getState();
  showByState(state);
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
  if (state != 'completed') {
    state = 'active';
  }
  const todo = new Todo(0, todoString, state);
  return todo;
}
function showByState(state) {
  const todos = getFromStorage();
  showClear(todos);
  const selectedTodos = selectTodos(todos, state);
  showTodos(selectedTodos);
  updateInputAndItems(selectedTodos);
}
function selectTodos(todos, state) {
  switch (state) {
    case 'active':
      return todos.filter(todo => todo.state === 'active');
    case 'completed':
      return todos.filter(todo => todo.state === 'completed');
    default:
      return todos;
  }
}
function showClear(todos) {
  activeTodos = todos.filter(todo => todo.state === 'active');
  completedTodos = todos.filter(todo => todo.state === 'completed');
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
}
function generateLabel(todos) {
  return todos.map(todo =>
    `<li class=${todo.state} id=${todo.id} onclick="setCompleted(this)">
        ${todo.content}
        <button class="delete" type="button" onclick="deleteTodo(this)">×</button>
    </li>`);
}
function updateInputAndItems(todos) {
  document.getElementById('items').innerHTML = `left items:${todos.length}`;
  document.getElementById('add').value = '';
}
function buttonInit() {
  document.getElementById('all').style.background = '#e0bb53';
  document.getElementById('active').style.background = '#e0bb53';
  document.getElementById('completed').style.background = '#e0bb53';
}
function changeState(ele) {
  const todos = getFromStorage();
  const updateTodos = todos.map(todo => {
    if (todo.id === parseInt(ele.id)) {
      todo.state = 'completed';
    }
    return todo;
  })
  updateStorage(updateTodos);
}
function deleteFromTodos(ele) {
  const todos = getFromStorage();
  const updateTodos = todos.filter(todo => todo.id != parseInt(ele.parentNode.id));
  updateStorage(updateTodos);
}
function clearFromTodos() {
  const todos = getFromStorage();
  const updateTodos = todos.filter(todo => todo.state != 'completed');
  updateStorage(updateTodos);
}