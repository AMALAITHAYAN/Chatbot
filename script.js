document.getElementById("chat-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const userInput = document.getElementById("user-input").value;
    const chatBox = document.getElementById("chat-box");

    // Append user message to chat
    const userMessage = document.createElement("div");
    userMessage.textContent = "You: " + userInput;
    userMessage.className = "user-message"; // Add class for user message styling
    chatBox.appendChild(userMessage);

    // Clear the input
    document.getElementById("user-input").value = "";

    // Simulate bot typing
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "typing"; // Add typing class for animation
    typingIndicator.textContent = "Bot is typing...";
    chatBox.appendChild(typingIndicator);

    // Send user input to backend
    fetch("/api/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Remove typing indicator
        chatBox.removeChild(typingIndicator);

        // Append bot response to chat
        const botMessage = document.createElement("div");
        botMessage.textContent = "Bot: " + data.fulfillmentText;
        botMessage.className = "bot-message"; // Add class for bot message styling
        chatBox.appendChild(botMessage);
        
        // Scroll to the bottom of the chat
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error("Error:", error);
        chatBox.removeChild(typingIndicator); // Remove typing indicator in case of error
    });
});
