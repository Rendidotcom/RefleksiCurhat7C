/*************************************************
 * DISPLAY.JS — CURHAT 7C (FINAL CLEAN)
 * VIEWER ONLY • NO FILTER • READ KOLOM B
 *************************************************/

(async () => {
  const list = document.getElementById("list");
  const empty = document.getElementById("empty");

  if (!list || !empty || typeof API_URL === "undefined") return;

  try {
    const res = await fetch(API_URL + "?mode=list");
    const json = await res.json();

    if (!json.ok || !Array.isArray(json.data) || json.data.length === 0) {
      empty.style.display = "block";
      return;
    }

    empty.style.display = "none";

    // tampilkan dari terbaru
    json.data.slice().reverse().forEach(text => {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = text;
      list.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    empty.textContent = "Gagal memuat refleksi.";
    empty.style.display = "block";
  }
})();
