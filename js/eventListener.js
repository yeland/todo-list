function loadAll() {
  loadTodos();
}
function buttonAddTodo() {
  addTodo();
  updateTodosAfterAdd();
}
function enterAddTodo() {
  checkEnterAddTodo();
}
function buttonShowAll(ele) {
  buttonInit();
  ele.style.background = 'white';
  showByState('all');
}
function showActive(ele) {
  buttonInit();
  ele.style.background = 'white';
  showByState('active');
}
function showCompleted(ele) {
  buttonInit();
  ele.style.background = 'white';
  showByState('completed');
}
function setCompleted(ele) {
  changeState(ele);
  updateTodos();
}
function deleteTodo(ele) {
  deleteFromTodos(ele);
  updateTodos();
}
function clearCompleted() {
  clearFromTodos();
  updateTodos();
}