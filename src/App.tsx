import { formInputList, productList as initialProducts } from "./data";
import ProductCard from "./components/ProductCard";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { ChangeEvent, useState, MouseEvent } from "react";
import Input from "./UI/Input";
import { IProduct } from "./interfaces";
function App() {
  /*_________State _________*/
  const [isOpen, setIsOpen] = useState(false);

  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  });

  const [productList, setProductList] = useState<IProduct[]>(initialProducts);

  /* _________ Handler _________ */
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onClose = () => {
    setProduct({
      title: "",
      description: "",
      imageURL: "",
      price: "",
      colors: [],
      category: {
        name: "",
        imageURL: "",
      },
    });
    close();
  };

  function addHandler(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    setProductList((prevList) => [...prevList, product]);
    console.log(product);
    onClose(); // تقفل المودال بعد الإضافة وتفضي الفورم
  }

  /*_________ Render _________*/
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInputList = formInputList.map((input) => (
    <div className="flex flex-col gap-2" key={input.id}>
      <label htmlFor={input.id} className="mt-[2px] text-gray-700 ">
        {input.label}
      </label>
      <Input
        name={input.name}
        id={input.id}
        type={input.type}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
    </div>
  ));

  return (
    <main className="container mx-auto">
      <Button className="my-5 bg-indigo-500" onClick={open}>
        ADD
      </Button>
      <div className="grid grid-cols-1 m-5 rounded-md md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-evenly md:gap-4">
        {renderProductList}
      </div>

      <Modal close={close} isOpen={isOpen} title="Add A Product">
        <form action="" className="space-y-3">
          {renderFormInputList}
          <div className="flex gap-2 mt-4">
            <Button
              className="w-full text-white bg-blue-500 hover:bg-blue-700"
              onClick={addHandler}
            >
              Submit
            </Button>
            <Button
              className="w-full text-white bg-gray-300 hover:bg-gray-400"
              onClick={() => {
                onClose;
              }}
            >
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
