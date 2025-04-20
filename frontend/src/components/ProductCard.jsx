const ProductCard = ({ product }) => {
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '½'}
        {'☆'.repeat(emptyStars)}
        {` ${rating.toFixed(1)}`}
      </>
    )
  }

  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="product-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/150?text=Imagem+Não+Disponível'
        }}
      />
      <h3 className="product-title">{product.title}</h3>
      <div className="product-rating">
        {renderRatingStars(product.rating)}
      </div>
      <div className="product-reviews">
        {product.reviews.toLocaleString()} avaliações
      </div>
    </div>
  )
}

export default ProductCard