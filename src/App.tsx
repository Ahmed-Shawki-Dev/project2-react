import { formInputList, productList } from './data'
import ProductCard from './components/ProductCard'
import Modal from './UI/Modal'
import Button from './UI/Button'
import { ChangeEvent, FormEvent, useState } from 'react'
import Input from './UI/Input'
import { IProduct } from './interfaces'
import { productValidation } from './validation'
import ErrorMessage from './components/ErrorMessage'

function App() {
  /*  ---------------Obj---------------------   */
  const productObj = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: '',
    },
  }

  /*_________State _________*/
  const [isOpen, setIsOpen] = useState(false)

  const [product, setProduct] = useState<IProduct>(productObj)

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  /* _________ Handler _________ */
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const onClose = () => {
    setProduct(productObj)
    close()
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    
    const validationErrors = productValidation(product)
    const hasErrorMsg = Object.values(validationErrors).some(value=>value==='') && Object.values(validationErrors).every(value=> value==='');
    if(!hasErrorMsg){
      setErrors(validationErrors)
      return;
    }}

  /*_________ Render _________*/
  const renderProductList = productList.map(product => (
    <ProductCard key={product.id} product={product} />
  ))

  const renderFormInputList = formInputList.map(input => (
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
      <ErrorMessage message={errors[input.name]} />
    </div>
  ))

  return (
    <main className="container mx-auto">
      <Button className="my-5 bg-indigo-500" onClick={open}>
        ADD
      </Button>
      <div className="grid grid-cols-1 m-5 rounded-md md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-evenly md:gap-4">
        {renderProductList}
      </div>

      <Modal close={close} isOpen={isOpen} title="Add A Product">
        <form action="" className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <div className="flex gap-2 mt-4">
            <Button className="w-full text-white bg-blue-500 hover:bg-blue-700">
              Submit
            </Button>
            <Button
              className="w-full text-white bg-gray-300 hover:bg-gray-400"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default App
