interface IProps {
  message?: string
}

const ErrorMessage = ({ message }: IProps) => {
  if (!message) return null

  return message ? (
    <p className="text-sm text-red-600 font-semibold">{message}</p>
  ) : null
}

export default ErrorMessage
