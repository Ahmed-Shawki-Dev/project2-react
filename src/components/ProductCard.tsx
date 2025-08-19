import Image from './Image'
import { IProduct } from '../interfaces'
import Button from '../UI/Button'
import { textSlice } from '../utils/function'
import CircleColor from './CircleColor'
import {memo} from 'react'

interface IProps {
  product: IProduct
  setUpdatedProduct: (product: IProduct) => void
  openEdit: () => void
  setUpdatedProductIdx:(num:number)=>void
  idx:number
}

const ProductCard = ({
  product,
  setUpdatedProduct,
  openEdit,
  setUpdatedProductIdx,
  idx,
}: IProps) => {
  const circleColorList = product.colors.map(color => (
    <CircleColor color={color} key={color} />
  ))

  /*_________ Handler _________*/
  const onEdit = () => {
    setUpdatedProduct(product)
    setUpdatedProductIdx(idx)
    openEdit()
  }

  return (
    <div className="w-[350px] border border-gray-300 rounded-md p-4 bg-white max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto flex flex-col gap-4 shadow-md">
      <div className="w-full h-60 overflow-hidden rounded-md">
        <Image
          imageURL={product.imageURL}
          alt="Image"
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="font-bold text-blue-700 text-2xl">{product.title}</h3>

      <p className="text-gray-800 text-base">
        {textSlice(product.description)}
      </p>

      <div className="flex flex-row gap-2">{circleColorList}</div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-blue-950">
          ${product.price}
        </span>
        <Image
          imageURL={product.category.imageURL}
          className="w-10 h-10 rounded-full object-contain"
          alt={product.category.name}
        />
      </div>

      <div className="flex gap-3">
        <Button
          className="bg-blue-500 text-white w-full hover:bg-blue-600"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button className="bg-red-500 text-white w-full hover:bg-red-700">
          Delete
        </Button>
      </div>
    </div>
  )
}

export default memo(ProductCard)
