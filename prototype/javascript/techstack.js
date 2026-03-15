let cards = document.querySelectorAll(".card");

cards.forEach((x, cardIndex) => {
  x.addEventListener("click", () => {
    let otherCards = Array.from(cards).filter(
      (_, index) => index !== cardIndex,
    );

    otherCards.forEach((y) => y.classList.toggle("off"));

    x.classList.toggle("on");
  });
});
