import * as React from "react";
import {
  Input,
  Typography,
  InputProps,
} from "@material-tailwind/react";


type TextFieldProps = InputProps & {
  label: string;
  error?: string;
  icon: React.ElementType;
};

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, icon: Icon, ...props }, ref) => {
    const id = React.useId();

    return (
      <Typography
        as="label"
        htmlFor={id}
        color="secondary"
        className="mb-6 block space-y-1.5"
      >
        <span className="text-sm font-semibold">{label}</span>
        <Input
          ref={ref}
          {...props}
          id={id}
          isError={Boolean(error)}
          color={error ? "error" : "primary"}
          className="bg-white"
        >
          <Input.Icon >
            <Icon className="h-full w-full" />
          </Input.Icon>
        </Input>
        {error && (
          <Typography type="small" color="error">
            {error}
          </Typography>
        )}
      </Typography>
    );
  },
);

export default TextField