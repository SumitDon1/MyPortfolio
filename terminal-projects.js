document.addEventListener('DOMContentLoaded', function() {
    const terminalContainer = document.getElementById('terminal-container');
    const terminalText = document.getElementById('terminal-text');
    
    // Text to display in terminal
    const messages = [
        { text: "> Accessing Projects Database...", delay: 500 },
        { text: "> Authenticating...", delay: 1000 },
        { text: "> Access Granted", delay: 800 },
        { text: "> Loading Project List...", delay: 1200 },
        { text: "> STATUS: Projects Will Be Added Soon", delay: 1000 },
        { text: "> MESSAGE: I'm currently working on some exciting new projects. Check back later!", delay: 0 }
    ];
    
    // Function to simulate typing in terminal
    function typeTerminal(messageIndex = 0) {
        if (messageIndex >= messages.length) {
            // Add blinking cursor after all messages
            const cursor = document.createElement('span');
            cursor.className = 'terminal-cursor';
            cursor.textContent = '█';
            terminalText.appendChild(cursor);
            return;
        }
        
        const message = messages[messageIndex];
        const messageElement = document.createElement('div');
        messageElement.className = 'terminal-line';
        
        // Create text container
        const textSpan = document.createElement('span');
        textSpan.className = 'terminal-message';
        messageElement.appendChild(textSpan);
        
        // Add to terminal
        terminalText.appendChild(messageElement);
        
        // Type effect for current message
        let charIndex = 0;
        const typeChar = () => {
            if (charIndex < message.text.length) {
                textSpan.textContent += message.text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, Math.random() * 50 + 30);
            } else {
                // Move to next message after delay
                setTimeout(() => typeTerminal(messageIndex + 1), message.delay);
            }
        };
        
        typeChar();
    }
    
    // Initialize terminal with loading animation
    const loadingElement = document.createElement('div');
    loadingElement.className = 'terminal-loading';
    terminalText.appendChild(loadingElement);
    
    // Start terminal sequence after loading
    setTimeout(() => {
        terminalText.innerHTML = '';
        typeTerminal();
    }, 1500);
});