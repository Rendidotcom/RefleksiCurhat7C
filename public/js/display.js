(async () => {
  const list = document.getElementById("list");
  const empty = document.getElementById("empty");

  if (!list || !empty) return;

  try {
    const res = await fetch(API_URL + "?mode=list");
    const json = await res.json();

    if (!json.ok || !Array.isArray(json.data)) {
      empty.style.display = "block";
      return;
    }

    // Ambil KOLOM B (index 1)
    const texts = json.data
      .map(row => row[1])
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
  }
})();
