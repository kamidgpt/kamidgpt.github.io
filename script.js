  //                                   //
 // SECTION DÉCISIONS CLÉS CASE STUDY //
//                                   //
const listItems = document.querySelectorAll('.decision-item');
const decisionImg = document.getElementById('decision-img');

let currentIndex = 0;
let interval;

// Active un item
function activateDecision(index) {
  listItems.forEach((item, i) => {
    item.classList.toggle('active', i === index);

    // ajuste l'opacité ou la taille des autres titres si nécessaire
    if(i !== index) {
      item.style.opacity = '0.5';
      item.style.fontSize = '1rem';
    } else {
      item.style.opacity = '1';
      item.style.fontSize = '1.3rem';
    }
  });

  const imgSrc = listItems[index].dataset.img;

  // fade image
  decisionImg.style.opacity = 0;
  setTimeout(() => {
    decisionImg.src = imgSrc;
    decisionImg.style.opacity = 1;
  }, 300);

  currentIndex = index;
}
// Boucle automatique
function startLoop() {
  interval = setInterval(() => {
    let nextIndex = (currentIndex + 1) % listItems.length;
    activateDecision(nextIndex);
  }, 3500); // tu peux augmenter ce nombre pour ralentir
}

// Stop boucle
function stopLoop() {
  clearInterval(interval);
}

// Hover interactions
listItems.forEach((item, index) => {
  item.addEventListener('mouseenter', () => {
    stopLoop();
    activateDecision(index);
  });

  item.addEventListener('mouseleave', () => {
    startLoop();
  });
});

// Initialisation
activateDecision(0);
startLoop();


  //                     //
 // CAROUSEL CASE STUDY //
//                     //
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const slideCount = slides.length;
const carousel = document.querySelector('.carousel-section');

let pos = 0;
let speed = 0.5;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let autoScroll = true;

// CLONER pour boucle infinie
slides.forEach(slide => {
  const cloneFirst = slide.cloneNode(true);
  const cloneLast = slide.cloneNode(true);
  track.appendChild(cloneFirst);
  track.insertBefore(cloneLast, track.firstChild);
});

// Ajuster la position initiale pour être sur le “vrai” premier slide
const slideWidth = slides[0].offsetWidth + 40; // img width + gap
pos = -slideWidth * slideCount;

// ANIMATION
function animate() {
  if (autoScroll && !isDragging) {
    pos -= speed;
    // Repositionnement invisible si on dépasse
    if (pos <= -slideWidth * (slideCount * 2)) pos = -slideWidth * slideCount;
    if (pos >= 0) pos = -slideWidth * slideCount;
  }

  track.style.transform = `translateX(${pos + currentTranslate}px)`;
  requestAnimationFrame(animate);
}
animate();

// PAUSE au hover
carousel.addEventListener('mouseenter', () => autoScroll = false);
carousel.addEventListener('mouseleave', () => autoScroll = true);

// DRAG
track.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX;
  track.classList.add('dragging');
  autoScroll = false;
});

track.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  currentTranslate = dx;
});

track.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  pos += currentTranslate;
  currentTranslate = 0;
  track.classList.remove('dragging');
});

track.addEventListener('mouseleave', () => {
  if (!isDragging) return;
  isDragging = false;
  pos += currentTranslate;
  currentTranslate = 0;
  track.classList.remove('dragging');
  autoScroll = true;
});

// TOUCH EVENTS
track.addEventListener('touchstart', e => {
  isDragging = true;
  startX = e.touches[0].clientX;
  autoScroll = false;
});
track.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const dx = e.touches[0].clientX - startX;
  currentTranslate = dx;
});
track.addEventListener('touchend', () => {
  isDragging = false;
  pos += currentTranslate;
  currentTranslate = 0;
  autoScroll = true;
});

  //                       //
 // BENTO GRID CASE STUDY //
//                       //
const wireframeItems = document.querySelectorAll('.visual-item img');
const overlay = document.getElementById('visualOverlay');
const overlayImg = overlay.querySelector('img');

// OUVRIR AU CLICK
wireframeItems.forEach(img => {
  img.addEventListener('click', () => {
    overlayImg.src = img.src;
    overlay.style.opacity = 1;
    overlay.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden'; // bloque le scroll
  });
});

// FERMER AU CLICK SUR OVERLAY
overlay.addEventListener('click', () => {
  overlay.style.opacity = 0;
  overlay.style.pointerEvents = 'none';
  document.body.style.overflow = ''; // réactive le scroll
});

// FERMER AVEC ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    overlay.style.opacity = 0;
    overlay.style.pointerEvents = 'none';
    document.body.style.overflow = '';
  }
});
