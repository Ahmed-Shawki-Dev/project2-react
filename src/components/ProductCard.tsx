import Image from "./Image";
import { IProduct } from "../interfaces";
import Button from "../UI/Button";
import { textSlice } from "../utils/function";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  return (
    <div className="border border-gray-300 rounded-md p-4 bg-white max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto flex flex-col gap-4 shadow-md">

      <div className="w-full h-60 overflow-hidden rounded-md">
        <Image
          imageURL={product.imageURL}
          alt="Image"
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="font-bold text-blue-700 text-2xl">
        {product.title}
      </h3>

      <p className="text-gray-800 text-base">
        {textSlice(product.description)}
      </p>

      <div className="flex flex-row gap-2">
        <span className="w-5 h-5 bg-blue-400 rounded-full"></span>
        <span className="w-5 h-5 bg-red-300 rounded-full"></span>
        <span className="w-5 h-5 bg-amber-300 rounded-full"></span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-blue-950">${product.price}</span>
        <img
          className="w-10 h-10 rounded-full object-contain"
          src="https://png.pngtree.com/png-clipart/20220109/original/pngtree-black-and-white-card-computer-logo-material-png-image_7031014.png"
          alt="logo"
        />
      </div>

      {/* الأزرار */}
      <div className="flex gap-3">
        <Button className="bg-blue-500 text-white w-full hover:bg-blue-600">Edit</Button>
        <Button className="bg-red-500 text-white w-full hover:bg-red-700">Delete</Button>
      </div>
      
    </div>
  );
};

export default ProductCard;
