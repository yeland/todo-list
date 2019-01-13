function loadTodos() {
  const todos = getFromStorage();
  document.getElementById('all').style.background = 'white';
  if (todos != -1) {
    showByState(todos, 'all');
  }
}
function getTodo() {
  const todoString = document.getElementById('add').value;
  if (!todoString.length) {
    return -1;
  }
  return new Todo(new Date().getMilliseconds(), todoString, 'active');  
}
function checkEnterAddTodo() {
  if (checkEnter()) {
    const todo = getTodo();
    saveToStorage(todo);
    updateTodos();
  }
}
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
function updateTodos() {
  const state = getState();
  showByState(state);
}
function showByState(state) {
  const todos = getFromStorage();
  showClear(todos);
  updateInputAndItems(todos);
  const selectedTodos = selectTodos(todos, state);
  showTodos(selectedTodos);
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
    let todosList = generateList(todos);
    document.getElementById('list').innerHTML = `<ul>${todosList.join('\n')}</ul>`
  } else {
    document.getElementById('list').innerHTML = '';
  }
}
function generateList(todos) {
  return todos.map(todo =>
    `<li class=${todo.state} id=${todo.id} onclick="setCompleted(this)">
      ${todo.content}<button class="delete" type="button" onclick="deleteTodo(this)">×</button>
    </li>`);
}
function updateInputAndItems(todos) {
  const activeTodos = todos.filter(todo => todo.state === 'active');
  document.getElementById('items').innerHTML = `left items:${activeTodos.length}`;
  document.getElementById('add').value = '';
}
function buttonInit() {
  document.getElementById('all').style.background = '#85dfe9';
  document.getElementById('active').style.background = '#85dfe9';
  document.getElementById('completed').style.background = '#85dfe9';
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