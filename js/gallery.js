import { images } from "./img-data.js";

// ===== MAKING GALLERY from array ======= //
// ===== MAKING GALLERY from array ======= //
const addImagesToGallery = (images) => {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery-item">
    <a class="gallery-link" href="${preview}">
        <img
        class="gallery-image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        width="360"
        height="200"
        />
    </a>
    </li>
    `;
    })
    .join("");
};

// ====== ADD IMAGES TO GALLERY + MADE EVENT_LISTNER TO ALL LIST======= //
const listRef = document.querySelector(".gallery");
const imgMarkup = addImagesToGallery(images);
listRef.insertAdjacentHTML("beforeend", imgMarkup);
listRef.addEventListener("click", handImageClick);

let instance;

// ===== MAKING LIBRARY FUNCTION, THAT OPENS and CLOSES MODAL WINDOW ===== //
function makeModalWindow(evt) {
  instance = basicLightbox.create(`
    <img src="${evt.target.dataset.source}" width="1112" height="640">
`);
  instance.show();

  window.addEventListener("keydown", addEvtListToEsc);
}

// ======== MADE EVENT_LISTNER TO ESC AND REMOUVE IT ======= //

function addEvtListToEsc(evt) {
  if (instance.visible() && evt.code === "Escape") {
    instance.close();
  }
  window.removeEventListener("keydown", addEvtListToEsc);
}

// ===== MAKING FINAL FUNCTION, THAT:
//  - REMOVE DEFAULT RELOAD
//  - DELETE EventList from UL (general list)
//  - CALL MODAL WINDOW FUNCTION

function handImageClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains("gallery-image")) {
    return;
  } else {
    makeModalWindow(evt);
  }
}
