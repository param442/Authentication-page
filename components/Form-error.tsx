import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface Form_errorProps {
  message?: string;
}

const Form_error = ({ message }: Form_errorProps) => {
  return message ? (
    <div className=" bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <span>{message}</span>
    </div>
  ) : null;
};

export default Form_error;
