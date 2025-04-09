function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }

  function showPopup(message, duration = 3000) {
    const popup = document.getElementById("popupNotif");
    const overlay = document.getElementById("popupOverlay");
    const popupMessage = document.getElementById("popupMessage");

    popupMessage.innerText = message;
    popup.style.display = "block";
    overlay.style.display = "block";

    setTimeout(() => {
      popup.style.display = "none";
      overlay.style.display = "none";
    }, duration);
  }

  async function fetchChartData() {
    const dataIHSG = [6900, 6750, 6850, 6600, 6620];
    const dataIDR = [15300, 15500, 15700, 16050, 16100];

    new Chart(document.getElementById("ihsgChart").getContext("2d"), {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "Now"],
        datasets: [
          {
            label: "IHSG",
            data: dataIHSG,
            borderColor: "#2563eb",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: { responsive: true },
    });

    new Chart(document.getElementById("idrChart").getContext("2d"), {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "Now"],
        datasets: [
          {
            label: "IDR/USD",
            data: dataIDR,
            borderColor: "#f59e0b",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: { responsive: true },
    });
  }

  fetchChartData();

  const scriptURL = "https://script.google.com/macros/s/AKfycby77nN-AiD5r2GsqdFEomiiA6L3IRZPZLachQAhyjPViIrtAKeSuyVWJcIkSwfgV9AnyA/exec";
  const form = document.forms["submit-to-google-sheet"];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        showPopup("Curhatanmu sudah terkirim. Terima kasih ya! ❤️");
        form.reset();
      })
      .catch((error) => {
        showPopup("Gagal mengirim. Cek koneksi internet kamu 😢");
      });
  });