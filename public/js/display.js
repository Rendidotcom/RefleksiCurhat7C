/*************************************************
 * DISPLAY.JS — CURHAT 7C (READ ONLY)
 * Menampilkan curhat 3 hari terakhir
 * Sudah difilter di server (GAS)
 *************************************************/

(function () {
  // Pastikan API_URL ada
  if (typeof API_URL === "undefined") {
    console.error("API_URL belum didefinisikan di config.js");
    return;
  }

  const container = document.getElementById("curhat-list");
  if (!container) {
    console.warn("Elemen #curhat-list tidak ditemukan");
    return;
  }

  // loading awal
  container.innerHTML = `
    <div class="curhat-loading">
      Memuat refleksi...
    </div>
  `;

  fetch(API_URL + "?mode=display")
    .then(res => res.json())
    .then(res => {
      container.innerHTML = "";

      if (!res.ok || !res.data || res.data.length === 0) {
        container.innerHTML = `
          <div class="curhat-empty">
            Belum ada refleksi yang bisa ditampilkan 🌱
          </div>
        `;
        return;
      }

      res.data.forEach(item => {
        const card = document.createElement("div");
        card.className = "curhat-card";

        const text = document.createElement("p");
        text.textContent = item.text;

        const date = document.createElement("small");
        date.textContent = item.date;

        card.appendChild(text);
        card.appendChild(date);
        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = `
        <div class="curhat-error">
          Refleksi tidak dapat dimuat saat ini.
        </div>
      `;
    });
})();
