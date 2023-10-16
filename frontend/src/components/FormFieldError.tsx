import { BiError } from 'react-icons/bi';

export const FormFieldError = ({ error }: { error: any }) => {
  return (
    error && (
      <p className="error">
        <BiError />
        {error.message}
      </p>
    )
  );
};
