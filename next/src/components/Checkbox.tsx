import { InputHTMLAttributes, ReactNode } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> {
  label?: ReactNode;
}

export default function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        {...props}
        type="checkbox"
        className="h-4 w-4 rounded border-white/30 bg-white/10 text-white focus:ring-white/50 focus:ring-offset-0"
      />
      {label && (
        <label htmlFor={props.id} className="ml-2 block text-sm text-white/80">
          {label}
        </label>
      )}
    </div>
  );
}

