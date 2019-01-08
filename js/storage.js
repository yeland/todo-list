function getFromStorage() {
  let todos = localStorage.getItem('todos');
  if (todos === null) {
    return -1;
  }
  return JSON.parse(todos);
}
function saveToStorage(todo) {
  let todos = localStorage.getItem('todos');
  if (todos === null) {
    todos = '[]';
  }
  todo.id = todos.length;
  let todosCollection = JSON.parse(todos);
  todosCollection.push(todo);
  localStorage.setItem('todos', JSON.stringify(todosCollection));
  return JSON.parse(localStorage.getItem('todos'));
}
function updateStorage(todos){
  localStorage.setItem('todos', JSON.stringify(todos));
  return JSON.parse(localStorage.getItem('todos'));
}