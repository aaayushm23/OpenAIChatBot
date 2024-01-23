async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    addMessageToChat("You", userInput, "user");
    document.getElementById('user-input').value = '';

    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    addMessageToChat("Bot", data.reply, "bot");
}

function addMessageToChat(sender, message, senderClass) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', senderClass);
    messageElement.innerHTML = `<strong>${sender}:</strong> <p>${message}</p>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
