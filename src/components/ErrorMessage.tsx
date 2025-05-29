interface IProps {
  message?: string
}

const ErrorMessage = ({ message }: IProps) => {
  if (!message) return null

  return message ? (
    <p className="block text-sm text-red-700 font-bold">{message}</p>
  ) : null
}

export default ErrorMessage
