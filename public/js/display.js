// ======================================================
// DISPLAY.JS — FINAL
// Ambil data dari GAS mode=list
// Menampilkan isi kolom B (curhat) apa adanya
// ======================================================

(async () => {
  const list = document.getElementById("list");
  const empty = document.getElementById("empty");

  if (!list || !empty) {
    console.error("Elemen #list atau #empty tidak ditemukan");
    return;
  }

  try {
    const res = await fetch(API_URL + "?mode=list", {
      method: "GET",
      redirect: "follow"
    });

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const json = await res.json();

    if (!json.ok || !Array.isArray(json.data)) {
      empty.style.display = "block";
      return;
    }

    // json.data = array teks kolom B
    if (json.data.length === 0) {
      empty.style.display = "block";
      return;
    }

    empty.style.display = "none";

    // tampilkan dari yang terbaru
    json.data.reverse().forEach(text => {
      if (typeof text !== "string") return;

      const card = document.createElement("div");
      card.className = "card";
      card.textContent = text; // TANPA FILTER
      list.appendChild(card);
    });

  } catch (err) {
    console.error("Display error:", err);
    empty.textContent = "Gagal memuat refleksi";
    empty.style.display = "block";
  }
})();
