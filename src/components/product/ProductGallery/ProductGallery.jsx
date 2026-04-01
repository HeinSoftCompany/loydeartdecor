export default function ProductGallery({ images, title }) {
  return (
    <div className="product-gallery">
      <div className="product-gallery__main">
        <img alt={images[0]?.alt ?? title} loading="eager" src={images[0]?.src} />
      </div>

      <div className="product-gallery__thumbs">
        {images.map((image) => (
          <img key={image.src} alt={image.alt} loading="lazy" src={image.src} />
        ))}
      </div>
    </div>
  );
}
