import {InputHTMLAttributes, memo} from 'react'
const Input = ({ ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="h-12 px-3 border-2 border-gray-300 rounded-md shadow-sm focus:border-[#2b7fff] focus:ring-1 focus:ring-[#2b7fff] focus:outline-none"
      {...rest}
    />
  )
}

export default memo(Input)