import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LucideIcon } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface DropdownProps {
  label: string;
  id?: string;
  options: DropdownOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  triggerLeftIcon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  selectTriggerClassName?: string;
  error?: string;
  groupLabel?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  id,
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  triggerLeftIcon: TriggerLeftIcon,
  disabled = false,
  className,
  selectTriggerClassName,
  error,
  groupLabel,
}) => {
  const selectId = id || React.useId();

  return (
    <div className={cn('flex flex-col space-y-1.5 w-full', className)}>
      <Label 
        htmlFor={selectId} 
        className={cn(
          'text-sm font-medium leading-none',
          disabled && 'cursor-not-allowed opacity-70',
          error && 'text-destructive'
        )}
      >
        {label}
      </Label>
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          id={selectId}
          className={cn(
            'h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            'data-[placeholder]:text-muted-foreground',
            TriggerLeftIcon ? 'justify-start' : 'justify-between', // Adjust based on icon presence
            error && 'border-destructive text-destructive focus:ring-destructive',
            selectTriggerClassName
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
        >
          <div className="flex items-center gap-2 flex-grow min-w-0">
            {TriggerLeftIcon && (
              <TriggerLeftIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
            )}
            <SelectValue placeholder={placeholder} className="truncate flex-grow" />
          </div>
          {/* Default ChevronDown is part of SelectTrigger styles/component in Shadcn */}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
            {options.length > 0 ? (
              options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    {option.icon && (
                      <option.icon className="h-4 w-4 text-muted-foreground mr-1 flex-shrink-0" aria-hidden="true" />
                    )}
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-options" disabled className="text-muted-foreground">
                No options available
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p id={`${selectId}-error`} className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default Dropdown;
