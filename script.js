const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const ratio = entry.intersectionRatio;

      if (ratio > 0) {
        entry.target.classList.add("show");
        entry.target.style.opacity = ratio.toFixed(2);
      } else {
        entry.target.classList.remove("show");
        entry.target.style.opacity = 0;
      }
    });
  },
  {
    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
  }
);

function addBottom() {
  const tooltips = document.querySelectorAll(".tooltip");
  for (let i = 0; i < Math.min(40, tooltips.length); i++) {
    tooltips[i].classList.add("bottom");
  }
}

const container = document.querySelector(".container");

async function getData() {
  try {
    const gistRes = await fetch(`https://api.github.com/gists/ec578df51c8684fd9729ee86958c4dbc`);
    const gistJson = await gistRes.json();
    const rawUrl = gistJson.files["api.json"].raw_url;
    const response = await fetch(rawUrl);
    const data = await response.json();

    if (!Array.isArray(data?.data)) return;

    data.data.forEach((item) => {
      const explanation = item?.explanation === "" ? "Samborowi nie chcialo sie dodawac wyjasnienia" : item?.explanation;

      if (!item?.phrase) return;

      const el = document.createElement("div");
      el.className = "content";
      el.innerHTML = `
        ${item.phrase}
        <div class="tooltip">${explanation}</div>
      `;

      container.appendChild(el);
      observer.observe(el);
    });

    addBottom();
  } catch (err) {
    console.error(err);
  }
}

getData();
