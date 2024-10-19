// script.js

const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userInput = document.getElementById('user-input').value;
    appendMessage(userInput, 'user-message');
    document.getElementById('user-input').value = '';

    const response = await sendMessageToDialogflow(userInput);
    appendMessage(response, 'bot-message');
});

function appendMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.className = className;
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

async function sendMessageToDialogflow(message) {
    const response = await fetch('http://localhost:5000/api/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }),
    });

    const data = await response.json();
    return data.fulfillmentText; // Return the bot's response
}
