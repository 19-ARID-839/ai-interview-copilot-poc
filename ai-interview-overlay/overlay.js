// overlay.js
console.log("AI Interview Copilot Loaded");

function createOverlay(answer) {
    const existingOverlay = document.getElementById("ai-overlay");
    if (existingOverlay) existingOverlay.remove();

    const overlay = document.createElement("div");
    overlay.id = "ai-overlay";
    overlay.style.position = "fixed";
    overlay.style.bottom = "20px";
    overlay.style.right = "20px";
    overlay.style.width = "300px";
    overlay.style.background = "rgba(30, 30, 30, 0.95)";
    overlay.style.color = "white";
    overlay.style.padding = "15px";
    overlay.style.borderRadius = "12px";
    overlay.style.fontFamily = "Arial, sans-serif";
    overlay.style.zIndex = "9999";
    overlay.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";

    overlay.innerHTML = `
        <h4 style="margin: 0; color: #00ffcc;">🤖 AI STAR Answer</h4>
        <p>${answer}</p>
        <button id="closeOverlay" style="margin-top:10px; background:red; color:white; border:none; padding:5px; border-radius:5px; cursor:pointer;">Close</button>
    `;

    document.body.appendChild(overlay);
    document.getElementById("closeOverlay").addEventListener("click", () => overlay.remove());
}

// Fetch dynamic answer from backend API
async function fetchAIAnswer(question) {
    const response = await fetch("http://localhost:8501/answer", {   // Streamlit endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question })
    });
    const data = await response.json();
    createOverlay(data.answer);
}

// Trigger overlay on hotkey (Ctrl+Shift+Y)
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "Y") {
        const question = prompt("Enter interview question:");
        if (question) fetchAIAnswer(question);
    }
});
