// ======================================================
// DISPLAY.JS — FINAL CLEAN NO FILTER
// Ambil SEMUA teks di KOLOM B, tampilkan apa adanya
// ======================================================

(async () => {
  const list = document.getElementById("list");
  const empty = document.getElementById("empty");

  if (!list || !empty) return;

  try {
    const res = await fetch(API_URL + "?mode=list");
    const json = await res.json();

    // validasi dasar
    if (!json || !json.ok || !Array.isArray(json.data)) {
      empty.style.display = "block";
      return;
    }

    // ambil kolom B TANPA FILTER
    const texts = json.data.map(row => row[1]);

    // cek apakah ada minimal 1 isi
    const hasContent = texts.some(t => t !== null && t !== undefined && t !== "");

    if (!hasContent) {
      empty.style.display = "block";
      return;
    }

    empty.style.display = "none";

    // tampilkan dari terbaru
    texts.reverse().forEach(text => {
      if (text === null || text === undefined || text === "") return;

      const card = document.createElement("div");
      card.className = "card";
      card.textContent = String(text); // tampilkan apa adanya
      list.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    empty.textContent = "Gagal memuat refleksi";
    empty.style.display = "block";
  }
})();
