function sendToBackend(imageBlob) {
  const formData = new FormData();
  formData.append("file", imageBlob, "image.jpg");

  fetch("http://localhost:5000/predict", {
    method: "POST",
    body: formData
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("🧠 AI response:", data);

      chrome.storage.local.set({
        lastPrediction: {
          result: data.result,
          confidence: data.confidence,
          image: URL.createObjectURL(imageBlob),
          timestamp: Date.now()
        }
      });
    })
    .catch((err) => console.error("❌ AI Error:", err));
}

// Mutation observer: auto-detect new images on WhatsApp Web
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.tagName === "IMG" && node.src.startsWith("blob:")) {
        fetch(node.src)
          .then((res) => res.blob())
          .then((blob) => sendToBackend(blob))
          .catch(console.error);
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
