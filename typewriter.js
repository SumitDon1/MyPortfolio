document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter');
    const textToType = "Hi, I am Sumit.";
    const typingSpeed = 150; // milliseconds per character
    const deletingSpeed = 75; // milliseconds per character
    const pauseTime = 2000; // time to pause when text is fully typed

    function typeText(text, currentIndex = 0) {
        if (currentIndex < text.length) {
            typewriterElement.textContent += text.charAt(currentIndex);
            setTimeout(() => typeText(text, currentIndex + 1), typingSpeed);
        } else {
            // Text fully typed, pause before deletion
            setTimeout(deleteText, pauseTime);
        }
    }

    function deleteText() {
        const currentText = typewriterElement.textContent;
        if (currentText.length > 0) {
            typewriterElement.textContent = currentText.slice(0, -1);
            setTimeout(deleteText, deletingSpeed);
        } else {
            // Text fully deleted, start typing again
            setTimeout(() => typeText(textToType), pauseTime / 2);
        }
    }

    // Start the typewriter effect
    typeText(textToType);
};