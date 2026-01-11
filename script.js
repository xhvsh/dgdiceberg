const container = document.querySelector(".container");

async function getData() {
  try {
    const gistRes = await fetch(`https://api.github.com/gists/ec578df51c8684fd9729ee86958c4dbc`);
    const gistJson = await gistRes.json();
    const rawUrl = gistJson.files["api.json"].raw_url;
    const response = await fetch(rawUrl);
    const data = await response.json();

    if (Array.isArray(data?.data)) {
      data.data.forEach((item) => {
        let explanation = item?.explanation === "" ? "Samborowi nie chcialo sie dodawac wyjasnienia" : item?.explanation;

        if (item?.phrase) {
          container.innerHTML += `<div class="content">${item.phrase}<div class='tooltip'>${explanation}</div></div>`;
        }
      });
    }

    let tooltips = document.querySelectorAll(".tooltip");
    for (let i = 0; i < 40; i++) {
      tooltips[i].classList.add("bottom");
    }
  } catch (err) {
    console.error(err);
  }
}

getData();
