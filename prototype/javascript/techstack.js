let cards = document.querySelectorAll(".card");

cards.forEach((x, cardIndex) => {
  let cardBool = true;

  x.addEventListener("click", async () => {
    let otherCards = Array.from(cards).filter(
      (_, index) => index !== cardIndex,
    );

    otherCards.forEach((y) => y.classList.toggle("off"));

    x.classList.toggle("on");
    const cardId = x.id;

    let existingCardMain = x.querySelector(".card-main");

    if (!existingCardMain) {
      const cardMain = document.createElement("div");
      cardMain.classList.add("card-main");
      const data = await fetchData(cardId);

      data.forEach((e) => {
        const block = createBlock(e.imgSrc, e.imgAlt, e.title, e.text);
        cardMain.appendChild(block);
      });
      x.appendChild(cardMain);
    } else {
      existingCardMain.remove();
    }
  });
});

function createBlock(imgSrc, imgAlt, title, text) {
  const block = document.createElement("div");
  block.classList.add("block");
  block.innerHTML = `
    <figure class="block-icon">
        <img src="${imgSrc}" alt="${imgAlt}" class="block-icon-img">
    </figure>
    <h3 class="block-title">${title}</h3>
    <p class="block-text">${text}</p>
  `;
  return block;
}

async function fetchData(id) {
  try {
    const response = await fetch(`../../data/${id}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error upon fetching ${id.toUpperCase()} data`);
    return;
  }
}
