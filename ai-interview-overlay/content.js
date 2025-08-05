// Create floating overlay
const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "20px";
overlay.style.right = "20px";
overlay.style.background = "rgba(0,0,0,0.8)";
overlay.style.color = "white";
overlay.style.padding = "15px";
overlay.style.borderRadius = "8px";
overlay.style.zIndex = "99999";
overlay.style.fontFamily = "Arial, sans-serif";
overlay.style.fontSize = "14px";
overlay.style.width = "300px";
overlay.style.maxHeight = "200px";
overlay.style.overflowY = "auto";
overlay.innerText = "🤖 AI Interview Copilot Ready...";
document.body.appendChild(overlay);

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "display_answer") {
        overlay.innerHTML = `<strong>AI Answer:</strong><br>${msg.answer}`;
    }
});
