export const productValidation = (product: {
  title: string
  description: string
  imageURL: string
  price: string
}) => {
  // ** Return Object
  const errors: {
    title: string
    description: string
    imageURL: string
    price: string
  } = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
  }

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = 'Produt Title Error'
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description = 'Produt Descripton Error'
  }

  const validURL =
    /(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\s]*)?/.test(
      product.imageURL
    )

  if (!validURL || !product.imageURL.trim()) {
    errors.imageURL = 'Produt Image URL Error'
  }

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = 'Produt Price Not Valid'
  }

  return errors
}
