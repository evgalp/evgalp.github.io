class Gallery {
  constructor(galleryId, lightboxId) {
    this.gallery = document.getElementById(`${galleryId}`);
    this.galleryLightbox = document.getElementById(`${lightboxId}`);
    this.gallery.addEventListener('click', this.getCurrentImage.bind(this));
    this.galleryLightbox.addEventListener('click', this.hideLightbox.bind(this));
  }

  getCurrentImage(e){
    this.galleryLightbox.children[0].children[0].src = e.target.src;
    this.galleryLightbox.style.display = "flex";
  }

  hideLightbox(e){
    this.galleryLightbox.style.display = "none";
  }
}

let g1 = new Gallery('gallery1', 'gallery-lightbox1');
