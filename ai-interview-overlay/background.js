chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "fetch_answer") {
        fetch(`http://localhost:8502/get_answer?question=${encodeURIComponent(request.question)}`)
            .then(res => res.json())
            .then(data => sendResponse({ answer: data.answer }))
            .catch(err => sendResponse({ error: err.toString() }));
        return true; // Keep channel open for async response
    }
});
