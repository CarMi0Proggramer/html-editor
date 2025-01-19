window.onload = () => {
  const accordions = document.getElementsByClassName("accordion");

  for (const accordion of accordions) {
    const accordionTitle =
      accordion.getElementsByClassName("accordion-title")[0];

    accordionTitle.addEventListener("click", () => {
      accordion.classList.toggle("active");
    });
  }
};
