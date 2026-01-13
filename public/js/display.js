/*************************************************
 * DISPLAY.JS — REFLEKSI CURHAT 7C (FINAL)
 * READ ONLY • NO FILTER • SAFE
 *************************************************/

document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("list");
  const empty = document.getElementById("empty");

  // HARD GUARD (tidak error, tidak rusak sistem)
  if (!list || !empty) {
    console.warn("Elemen #list atau #empty tidak ditemukan");
    return;
  }

  try {
    const res = await fetch(API_URL + "?mode=list", {
      method: "GET",
      redirect: "follow"
    });

    if (!res.ok) throw new Error("HTTP_ERROR");

    const json = await res.json();

    if (!json.ok || !Array.isArray(json.data)) {
      empty.style.display = "block";
      return;
    }

    // AMBIL LANGSUNG KOLOM B (TEXT) — TANPA FILTER
    const texts = json.data
      .map(row => {
        // kompatibel: array ATAU object
        if (typeof row === "string") return row;
        if (Array.isArray(row)) return row[1];
        if (row.text) return row.text;
        return "";
      })
      .filter(t => typeof t === "string" && t.trim() !== "");

    if (texts.length === 0) {
      empty.style.display = "block";
      return;
    }

    empty.style.display = "none";
    list.innerHTML = "";

    // TAMPILKAN TERBARU DI ATAS
    texts.reverse().forEach(text => {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = text; // NO FILTER
      list.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    empty.textContent = "Gagal memuat refleksi 🌧️";
    empty.style.display = "block";
  }
});
