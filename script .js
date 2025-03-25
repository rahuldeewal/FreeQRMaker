document.getElementById("themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    this.textContent = document.body.classList.contains("dark-mode") ? "☀ Light Mode" : "🌙 Dark Mode";
});

function generateQR() {
    var text = document.getElementById("qrText").value.trim();
    if (text === "") return;

    var qrColor = document.getElementById("qrColor").value.replace("#", "");
    var bgColor = document.getElementById("bgColor").value.replace("#", "");
    var errorLevel = document.getElementById("errorLevel").value;
    var qrSize = document.getElementById("qrSize").value || 200;

    var qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=${qrSize}x${qrSize}&color=${qrColor}&bgcolor=${bgColor}&ecc=${errorLevel}`;

    var qrImage = document.getElementById("qrImage");
    var downloadLink = document.getElementById("downloadLink");

    qrImage.src = qrUrl;
    qrImage.style.display = "block";

    fetch(qrUrl)
        .then(response => response.blob())
        .then(blob => {
            var blobUrl = URL.createObjectURL(blob);
            downloadLink.href = blobUrl;
            downloadLink.download = "qrcode.png";
            downloadLink.style.display = "inline-block";
        })
        .catch(error => console.error("Download Error:", error));
}

function resetQR() {
    document.getElementById("qrText").value = "";
    document.getElementById("qrImage").style.display = "none";
    document.getElementById("downloadLink").style.display = "none";
}

function copyText() {
    var text = document.getElementById("qrText").value;
    if (text === "") {
        alert("Please enter text to copy.");
        return;
    }
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
}
