document.querySelectorAll('img.svg').forEach(async (img) => {
  const imgURL = img.getAttribute('src');
  
  try {
    const response = await fetch(imgURL);
    const text = await response.text();
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'image/svg+xml');
    const svg = xmlDoc.querySelector('svg');

    if (!svg) return;

    Array.from(img.attributes).forEach(attr => {
      if (attr.name !== 'src' && attr.name !== 'alt' && attr.name !== 'class') {
        svg.setAttribute(attr.name, attr.value);
      }
    });

    const imgClass = img.getAttribute('class');
    if (imgClass) {
      svg.setAttribute('class', imgClass);
    } else {
      svg.setAttribute('class', '');
    }

    const imgAlt = img.getAttribute('alt');
    if (imgAlt) {
      svg.setAttribute('aria-label', imgAlt);
      svg.setAttribute('role', 'img');
    }

    svg.removeAttribute('xmlns:a');

    img.replaceWith(svg);
    
  } catch (error) {
    console.error(`Error upon loading SVG: ${imgURL}`, error);
  }
});