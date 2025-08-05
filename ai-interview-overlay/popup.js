document.getElementById("getAnswer").addEventListener("click", () => {
    const question = document.getElementById("question").value;
    chrome.runtime.sendMessage({ type: "fetch_answer", question }, (response) => {
        if (response.answer) {
            document.getElementById("answer").innerText = response.answer;
            // Send answer to overlay
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { type: "display_answer", answer: response.answer });
            });
        } else {
            document.getElementById("answer").innerText = "❌ Error fetching answer.";
        }
    });
});
