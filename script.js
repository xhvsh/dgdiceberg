let list = document.querySelector(".list")
let overlay = document.querySelector(".overlay")
let popup = document.querySelector(".popup")

async function getData() {
  let response = await fetch(`https://xhvsh.github.io/icebergapi/iceberg.json`)
  let rawData = await response.json()
  let data = rawData.data

  for (let i = 0; i < data.length; i++) {
    list.innerHTML += `
    <div class="word" data-exp="${data[i].explanation}">${data[i].phrase}</div>
    `
  }

  let words = document.querySelectorAll(".word")
  words.forEach((word) => {
    word.addEventListener("click", () => {
      overlay.classList.remove("hidden")
      popup.classList.remove("hiddenpopup")

      popup.innerHTML += `${word.getAttribute("data-exp")}`
    })
  })
}

getData()

overlay.addEventListener("click", () => {
  overlay.classList.add("hidden")
  popup.classList.add("hiddenpopup")
  popup.innerHTML = ``
})
