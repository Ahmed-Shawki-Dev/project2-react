import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { v4 as uuid } from 'uuid'

// Data imports
import { categories, colors, formInputList, productList } from './data'

// Component imports
import CircleColor from './components/CircleColor'
import ErrorMessage from './components/ErrorMessage'
import ProductCard from './components/ProductCard'

// UI imports
import Button from './UI/Button'
import Input from './UI/Input'
import Modal from './UI/Modal'
import Select from './UI/Select'

// Types & Interfaces
import { IProduct } from './interfaces'
import { TInputName } from './types'
import { productValidation } from './validation'

function App() {
  // =============================== 
  // INITIAL OBJECTS & CONSTANTS
  // ===============================
  const productObj = {
    id: '',
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

  const initialErrors = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: '',
  }

  // ===============================
  // STATE MANAGEMENT
  // ===============================

  // Modal states
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  // Product states
  const [products, setProducts] = useState<IProduct[]>(productList)
  const [product, setProduct] = useState<IProduct>(productObj)
  const [updatedProduct, setUpdatedProduct] = useState<IProduct>(productObj)
  const [updatedProductIdx, setUpdatedProductIdx] = useState<number>(0)

  // Form states
  const [errors, setErrors] = useState<{ [key: string]: string }>(initialErrors)
  const [tempColor, setTempColor] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  // ===============================
  // MODAL HANDLERS
  // ===============================

  const open = useCallback(() => {
    setErrors(initialErrors)
    setIsOpen(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const close = useCallback(() => setIsOpen(false), [])
  const onClose = () => {
    setProduct(productObj)
    setTempColor([])
    setSelectedCategory(categories[0])
    close()
  }

  const openEdit = useCallback(() => {
    setErrors(initialErrors)
    setIsEditOpen(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const closeEdit = useCallback(() => {
    setUpdatedProduct(productObj)
    setTempColor([])
    setSelectedCategory(categories[0])
    setIsEditOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ===============================
  // FORM HANDLERS
  // ===============================
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }, [])

  const onChangeUpdateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedProduct(prev => ({ ...prev, [name]: value }))
    setErrors({ ...errors, [name]: '' })
  }

  const colorHandler = (color: string): void => {
    if (tempColor.includes(color)) {
      setTempColor(prev => prev.filter(c => c !== color))
      return
    }
    if (updatedProduct.colors.includes(color)) {
      setTempColor(prev => prev.filter(c => c !== color))
      return
    }
    setTempColor(prev => [...prev, color])
    setErrors(prev => ({ ...prev, colors: '' }))
  }

  // ===============================
  // *SUBMIT HANDLERS
  // ===============================

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

  const submitUpdateHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const { title, description, price, imageURL } = updatedProduct
    const validationErrors = productValidation({
      title,
      description,
      price,
      imageURL,
      colors: [...updatedProduct.colors, ...tempColor],
    })

    const hasErrorMsg = Object.values(validationErrors).some(
      value => value !== ''
    )

    if (hasErrorMsg) {
      setErrors(validationErrors)
      return
    }

    const updatedProducts = [...products]
    const mergedColors = Array.from(
      new Set([...updatedProduct.colors, ...tempColor])
    )

    updatedProducts[updatedProductIdx] = {
      ...updatedProduct,
      colors: mergedColors,
    }

    setProducts(updatedProducts)
    setUpdatedProduct(productObj)
    setTempColor([])
    closeEdit()
  }

  // ===============================
  // RENDER HELPERS
  // ===============================

  const renderUpdateInputs = (id: string, label: string, name: TInputName) => (
    <div className="flex flex-col gap-2">
      <label id={id} className="mt-[2px] text-gray-700">
        {label}
      </label>
      <Input
        name={name}
        id={id}
        type="text"
        value={updatedProduct[name]}
        onChange={onChangeUpdateHandler}
      />
      <ErrorMessage message={errors[name]} />
    </div>
  )

  // ===============================
  // RENDER LISTS
  // ===============================

  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setUpdatedProduct={setUpdatedProduct}
      openEdit={openEdit}
      setUpdatedProductIdx={setUpdatedProductIdx}
      idx={idx}
    />
  ))

  const renderFormInputList = formInputList.map(input => (
    <div className="flex flex-col gap-2" key={input.id}>
      <label htmlFor={input.id} className="mt-[2px] text-gray-700">
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

  // ===============================
  // * MAIN RENDER
  // ===============================

  return (
    <main className="container mx-auto">
      <Button className="my-5 bg-indigo-500" onClick={open}>
        ADD
      </Button>

      <div className="flex flex-wrap justify-between gap-4 m-5 rounded-md">
        {renderProductList}
      </div>

      {/* ADD PRODUCT MODAL */}
      <Modal close={close} isOpen={isOpen} title="Add A Product">
        <form className="space-y-3 overflow-hidden" onSubmit={submitHandler}>
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

      {/* EDIT PRODUCT MODAL */}
      <Modal close={closeEdit} isOpen={isEditOpen} title="Edit The Product">
        <form
          className="space-y-3 overflow-hidden"
          onSubmit={submitUpdateHandler}
        >
          {renderUpdateInputs('title', 'Add Title', 'title')}
          {renderUpdateInputs('description', 'Add Description', 'description')}
          {renderUpdateInputs('imageURL', 'Add imageURL', 'imageURL')}
          {renderUpdateInputs('price', 'Add price', 'price')}

          <Select
            selected={updatedProduct.category}
            setSelected={value =>
              setUpdatedProduct({ ...updatedProduct, category: value })
            }
          />

          <div className="flex space-x-1 flex-wrap space-y-1">
            {tempColor.concat(updatedProduct.colors).map(color => (
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
              onClick={closeEdit}
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
