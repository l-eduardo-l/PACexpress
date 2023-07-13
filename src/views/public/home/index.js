function resetaImagens(images) {
  let IndexActive = 0;
  for (let index = 0; index < images.length; index++) {
    const element = images[index];
    if (element.classList.contains('active')) {
      IndexActive = index;
      element.classList.remove('active');
      element.classList.remove('off');
      break;
    }
  }

  return IndexActive;
}

function switchCarrosel() {
  const images = document.querySelectorAll('.carrosel-item');
  const botaoEsquerdo = document.querySelector('.left-arrow');
  const botaoDireito = document.querySelector('.right-arrow');
  let indexAtivo = 0;

  botaoDireito.addEventListener('click', () => {
    indexAtivo = resetaImagens(images);

    if (indexAtivo < images.length - 1) {
      images[indexAtivo + 1].classList.remove('off');
      images[indexAtivo + 1].classList.add('active');
    } else {
      images[0].classList.remove('off');
      images[0].classList.add('active');
    }
  });

  botaoEsquerdo.addEventListener('click', () => {
    indexAtivo = resetaImagens(images);

    if (indexAtivo > 0) {
      images[indexAtivo - 1].classList.remove('off');
      images[indexAtivo - 1].classList.add('active');
    } else {
      images[images.length - 1].classList.remove('off');
      images[images.length - 1].classList.add('active');
    }
  });
}
