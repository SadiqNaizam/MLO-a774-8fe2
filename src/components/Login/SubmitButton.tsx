import React from 'react';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps extends Omit<ButtonProps, 'type' | 'dangerouslySetInnerHTML'> {
  isLoading?: boolean;
  type?: 'submit' | 'button' | 'reset';
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  isLoading = false,
  disabled,
  className,
  variant = "default" as const,
  type = 'submit' as const,
  ...props
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      disabled={disabled || isLoading}
      className={cn(
        'w-full',
        'shadow-sm', // As per requirement: "subtle shadow"
        // "rounded corners" is default (rounded-md) from Shadcn Button
        isLoading && 'cursor-not-allowed',
        className
      )}
      {...props}
    >
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      {children}
    </Button>
  );
};

export default SubmitButton;
