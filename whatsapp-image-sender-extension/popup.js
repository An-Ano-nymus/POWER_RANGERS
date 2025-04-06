function formatTimestamp(ms) {
  const date = new Date(ms);
  return date.toLocaleString();
}

// document.addEventListener("DOMContentLoaded", () => {
//   chrome.storage.local.get("lastPrediction", (data) => {
//     const prediction = data.lastPrediction || {};
//     const result = prediction.result || "undefined";
//     const confidence = prediction.confidence !== undefined ? prediction.confidence : "undefined";
//     const image = prediction.image || "";
//     const timestamp = prediction.timestamp || Date.now();

//     document.getElementById("preview").src = image;
//     document.getElementById("result").textContent = `Result: ${result}`;
//     document.getElementById("confidence").textContent = `Confidence: ${confidence}%`;

//     const date = new Date(timestamp);
//     document.getElementById("timestamp").textContent = `Checked on: ${date.toLocaleString()}`;
//   });
// });

chrome.storage.local.get("lastPrediction", (data) => {
  const pred = data.lastPrediction;
  if (pred) {
    document.getElementById("preview").src = pred.image;
    document.getElementById("result").textContent = "Result: " + pred.result;
    document.getElementById("confidence").textContent =
      "Confidence: " + (pred.confidence || "N/A") + "%";
    document.getElementById("timestamp").textContent =
      "Checked on: " + formatTimestamp(pred.timestamp);
  } else {
    document.getElementById("result").textContent = "No prediction found.";
  }
});

document.getElementById("checkButton").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (!file) return alert("Please select an image.");

  const formData = new FormData();
  formData.append("file", file);

  fetch("http://localhost:5000/predict", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        document.getElementById("preview").src = reader.result;
        document.getElementById("result").textContent = "Result: " + data.result;
        document.getElementById("confidence").textContent = "Confidence: " + data.confidence + "%";
        document.getElementById("timestamp").textContent = "Checked on: " + formatTimestamp(Date.now());

        chrome.storage.local.set({
          lastPrediction: {
            result: data.result,
            confidence: data.confidence,
            image: reader.result,
            timestamp: Date.now(),
          },
        });
      };
      reader.readAsDataURL(file);
    })
    .catch((err) => {
      console.error(err);
      alert("Error sending image to backend.");
    });
});
