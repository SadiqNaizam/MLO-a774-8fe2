import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';

interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'type' | 'dangerouslySetInnerHTML'> {
  label: string;
  id: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onRightIconClick?: () => void;
  error?: string;
  containerClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = 'text' as const,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onRightIconClick,
  error,
  className,
  containerClassName,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const isPasswordType = type === 'password';

  const handleTogglePassword = React.useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const currentInputType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={cn('flex flex-col space-y-1.5 w-full', containerClassName)}>
      <Label 
        htmlFor={id} 
        className={cn(
          'text-sm font-medium leading-none',
          props.disabled && 'cursor-not-allowed opacity-70',
          error && 'text-destructive'
        )}
      >
        {label}
      </Label>
      <div className="relative flex items-center">
        {LeftIcon && (
          <LeftIcon className="absolute left-3 h-5 w-5 text-muted-foreground pointer-events-none" aria-hidden="true" />
        )}
        <Input
          id={id}
          type={currentInputType}
          className={cn(
            // Base Shadcn input styles included for consistency
            'h-10 w-full rounded-md border border-input bg-background py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            LeftIcon ? 'pl-10' : 'px-3',
            (isPasswordType || (RightIcon && onRightIconClick) || RightIcon) ? 'pr-10' : RightIcon ? 'pr-10' : 'px-3', // Adjust right padding
            error && 'border-destructive focus-visible:ring-destructive text-destructive placeholder:text-destructive/70',
            className
          )}
          {...props}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {isPasswordType ? (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-controls={id}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        ) : RightIcon ? (
          <button
            type="button"
            onClick={onRightIconClick}
            className={cn(
              "absolute right-3 p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm transition-colors",
              !onRightIconClick && "pointer-events-none"
            )}
            aria-label={onRightIconClick ? "Right icon action" : undefined} // Consider a more descriptive label if interactive
            disabled={!onRightIconClick || props.disabled}
            aria-controls={id}
          >
            <RightIcon className="h-5 w-5" />
          </button>
        ) : null}
      </div>
      {error && <p id={`${id}-error`} className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default InputField;
