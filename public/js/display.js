(async () => {
  const list = document.getElementById("list");
  const empty = document.getElementById("empty");
  if (!list || !empty) return;

  try {
    const res = await fetch(API_URL + "?mode=list");
    const json = await res.json();

    // === NORMALISASI DATA ===
    let rows = [];

    if (Array.isArray(json?.data)) {
      rows = json.data;
    } else if (Array.isArray(json?.data?.values)) {
      rows = json.data.values;
    } else if (Array.isArray(json?.rows)) {
      rows = json.rows;
    }

    // === AMBIL KOLOM B (INDEX 1) TANPA FILTER ===
    const texts = rows
      .map(r => r?.[1])
      .filter(t => typeof t === "string" && t.trim() !== "");

    if (texts.length === 0) {
      empty.style.display = "block";
      return;
    }

    empty.style.display = "none";

    texts.reverse().forEach(text => {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = text;
      list.appendChild(card);
    });

  } catch (err) {
    empty.textContent = "Gagal memuat refleksi";
    empty.style.display = "block";
    console.error(err);
  }
})();
