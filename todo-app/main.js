const addTask = document.querySelector('.add');
const list = document.querySelector('.tasks');

let todos = [];

function addTodo(text) {
    const todo = {
        id: Date.now(),
        text,
    };
    todos.push(todo);
}

function renderTodo() {
    let temp = '';
    todos.forEach(todo => {
        const html = `
            <li key="${todo.id}">
                <span>${todo.text}</span>
            </li>
            `;
        temp += html;
    });

    list.innerHTML = temp;
}

addTask.addEventListener('submit', e => {  // e = イベントオブジェクト
    e.preventDefault();                    //メソッドのデフォルトのアクションをキャンセル

    const text = addTask.add.value.trim(); // trim()は文字列の両端の空白を削除
    if (text !== '') {    
        addTodo(text);
        addTask.reset();
        renderTodo();
    }
});