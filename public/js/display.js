/*************************************************
 * DISPLAY.JS — REFLEKSI CURHAT 7C (FINAL)
 * Menampilkan refleksi 3 hari terakhir
 * Data dari Google Apps Script (mode=list)
 *************************************************/

document.addEventListener("DOMContentLoaded", loadRefleksi);

async function loadRefleksi() {
  const container = document.getElementById("refleksi-list");
  if (!container) return;

  container.innerHTML = `
    <div class="loading">
      🌱 Memuat refleksi...
    </div>
  `;

  try {
    const res = await fetch(`${API_URL}?mode=list`);
    const json = await res.json();

    if (!json.ok || !json.data || json.data.length === 0) {
      container.innerHTML = `
        <div class="empty">
          Belum ada refleksi yang bisa ditampilkan 🌿
        </div>
      `;
      return;
    }

    container.innerHTML = "";

    json.data.forEach(item => {
      const card = document.createElement("div");
      card.className = "refleksi-card";

      card.innerHTML = `
        <div class="refleksi-text">
          “${escapeHTML(item.text)}”
        </div>
        <div class="refleksi-time">
          ${formatDate(item.time)}
        </div>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = `
      <div class="error">
        Gagal memuat refleksi 🙏
      </div>
    `;
    console.error(err);
  }
}

/* ========= UTIL ========= */

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
