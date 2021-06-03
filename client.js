const socket = io('http://localhost:3000');

var name = prompt('NAME');
if (name.length == 0 || name == "null") {

    window.location.reload();
}

const form = document.getElementById('form1');
const messageInput = document.getElementById('message');
const messageContainer = document.getElementById('chatBox1');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('chat');
    messageElement.classList.add(`${position}`);
    messageContainer.append(messageElement);
};
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('message', message);
    messageInput.value = "";
});
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});
socket.emit('new', name);
socket.on('others', data => {
    append(`${data} joined`, 'left');

});