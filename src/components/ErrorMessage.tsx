interface IProps {
  message?: string;
}

const ErrorMessage = ({message}: IProps) => {
    if(!message) return null;

  return <p className="text-sm text-red-500">{message}</p>;
};

export default ErrorMessage;
