const formatPrice = (price: number) => {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(price);

  return formattedPrice.replace(',00', '');
}

export default formatPrice;