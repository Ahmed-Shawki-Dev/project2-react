import { formInputList, productList, colors, categories } from './data'
import ProductCard from './components/ProductCard'
import Modal from './UI/Modal'
import Button from './UI/Button'
import { ChangeEvent, FormEvent, useState } from 'react'
import Input from './UI/Input'
import { IProduct } from './interfaces'
import { productValidation } from './validation'
import ErrorMessage from './components/ErrorMessage'
import CircleColor from './components/CircleColor'
import { v4 as uuid } from 'uuid'
import Select from './UI/Select'

function App() {
  /*  ---------------Obj---------------------   */
  const productObj = {
    id:'',
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
  
  const [isEditOpen, setIsEditOpen] = useState(false)

  const [product, setProduct] = useState<IProduct>(productObj)

  const [updatedProduct, setUpdatedProduct] = useState<IProduct>(productObj)
  console.log(updatedProduct)
  
  const [products, setProducts] = useState<IProduct[]>(productList)

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: '',
  })

  const [tempColor, setTempColor] = useState<string[]>([])

  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  /* _________ Handler _________ */
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  function openEdit() {
    setIsEditOpen(true)
    
  }
      function closeEdit() {
        setIsEditOpen(false)
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
    setErrors({
      ...errors,
      [name]: '',
    })
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const validationErrors = productValidation({
      ...product,
      colors: tempColor,
    })
    const hasErrorMsg = Object.values(validationErrors).some(
      value => value !== ''
    )

    if (hasErrorMsg) {
      setErrors(validationErrors)
      console.log(validationErrors)
      return
    }

    setProducts(prev => [
      { ...product, id: uuid(), colors: tempColor, category: selectedCategory },
      ...prev,
    ])
    setProduct(productObj)
    setTempColor([])
    onClose()
  }

  const colorHandler = (color: string): void => {
    setTempColor(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
    setErrors(prev => ({ ...prev, colors: '' }))
  }

  /*_________ Render _________*/
  const renderProductList = products.map(product => (
    <ProductCard
      key={product.id}
      product={product}
      setUpdatedProduct={setUpdatedProduct}
      openEdit={openEdit}
    />
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

  const circleColorList = colors.map(color => (
    <CircleColor
      color={color}
      key={color}
      onClick={() => colorHandler(color)}
    />
  ))

  return (
    <main className="container mx-auto">
      <Button className="my-5 bg-indigo-500" onClick={open}>
        ADD
      </Button>
      <div className="flex flex-wrap justify-between gap-4 m-5 rounded-md">
        {renderProductList}
      </div>

      <Modal close={close} isOpen={isOpen} title="Add A Product">
        <form
          action=""
          className="space-y-3 overflow-hidden"
          onSubmit={submitHandler}
        >
          {renderFormInputList}

          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          <div className="flex space-x-1 flex-wrap space-y-1">
            {tempColor.map(color => (
              <span
                key={color}
                className="rounded-xl p-0.5 text-white h-fit"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex gap-1 flex-wrap">{circleColorList}</div>
          <ErrorMessage message={errors.colors} />

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




      <Modal close={closeEdit} isOpen={isEditOpen} title="Edit The Product">
        <form
          action=""
          className="space-y-3 overflow-hidden"
          onSubmit={submitHandler}
        >
          {renderFormInputList}

          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          <div className="flex space-x-1 flex-wrap space-y-1">
            {tempColor.map(color => (
              <span
                key={color}
                className="rounded-xl p-0.5 text-white h-fit"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex gap-1 flex-wrap">{circleColorList}</div>
          <ErrorMessage message={errors.colors} />

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
