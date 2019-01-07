function loadTodos() {
  const todos = getFromStorage();
  if (todos != -1) {
    showTodosByState(todos, 'all');
  }
}
function addTodo() {
  const state = getState();
  const todo = getTodo(state);
  if (todo != -1) {
    const todos = saveToStorage(todo);
    if (state === 'completed') {
      const completedTodos = chooseCompleted(todos);
      update(completedTodos);
    } else {
      showTodosByState(todos, state);
    }
  }
}
function enterAddTodo() {
  const state = getState();
  const enter = checkEnter();
  if(enter) {
    const todo = getTodo(state);
    const todos = saveToStorage(todo);
    if (state === 'completed') {
      const completedTodos = chooseCompleted(todos);
      update(completedTodos);
    } else {
      showTodosByState(todos, state);
    }
  }
}
function showDelete(ele) {
  ele.firstElementChild.style.visibility = 'visible';
}
function hiddenDelete(ele) {
  ele.firstElementChild.style.visibility = 'hidden';
}
function showAll(ele) {
  const todos = getFromStorage();
  showTodosByState(todos, 'all');
  buttonInit();
  ele.style.background = 'white';
}
function showActive(ele) {
  const todos = getFromStorage();
  showTodosByState(todos, 'active')
  buttonInit();
  ele.style.background = 'white';
}
function showCompleted(ele) {
  const todos = getFromStorage();
  showTodosByState(todos, 'completed')
  buttonInit();
  ele.style.background = 'white';
}
function setCompleted(ele) {
  const state = getState();
  const todos = getFromStorage();
  const afterTodos = changeState(todos, ele);
  const updateTodos = updateStorage(afterTodos);
  showTodosByState(updateTodos, state);
}
function deleteTodo(ele) {
  const state = getState();
  const todos = getFromStorage();
  const afterTodos = deleteFromTodos(todos, ele);
  const updateTodos = updateStorage(afterTodos);
  showTodosByState(updateTodos, state);
}
function clearCompleted() {
  const state = getState();
  const todos = getFromStorage();
  const afterTodos = clearFromTodos(todos);
  const updateTodos = updateStorage(afterTodos);
  showTodosByState(updateTodos, state);
}