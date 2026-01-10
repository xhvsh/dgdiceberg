const api = "https://xhvsh.github.io/icebergapi/iceberg.json",
  container = document.querySelector(".container");

async function getData() {
  try {
    const response = await fetch(api);
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
