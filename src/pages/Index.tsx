import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, KeyRound, Users } from 'lucide-react';

import MainAppLayout from '../components/layout/MainAppLayout';
import InputField from '../components/Login/InputField';
import Dropdown, { type DropdownOption } from '../components/Login/Dropdown';
import SubmitButton from '../components/Login/SubmitButton';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }).min(1, { message: 'Email is required.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  role: z.string().min(1, { message: 'Please select a role.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const roleOptions: DropdownOption[] = [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Administrator' },
  { value: 'editor', label: 'Editor' },
];

const LoginPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      role: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsSubmitting(true);
    setApiError(null);
    console.log('Login data:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (data.email === 'error@example.com') {
      setApiError('Login failed. Invalid credentials or role.');
    } else {
      // In a real app, you would navigate or set auth state here
      alert(`Login successful!\nEmail: ${data.email}\nRole: ${data.role}`);
    }
    setIsSubmitting(false);
  };

  return (
    <MainAppLayout>
      <h1 className="text-2xl font-semibold text-center text-foreground">
        Login
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <InputField
          id="email"
          label="Email Address"
          type="email"
          leftIcon={Mail}
          {...register('email')}
          error={errors.email?.message}
          disabled={isSubmitting}
          placeholder="you@example.com"
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          leftIcon={KeyRound}
          {...register('password')}
          error={errors.password?.message}
          disabled={isSubmitting}
          placeholder="••••••••"
        />
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Dropdown
              id="role"
              label="Login As"
              options={roleOptions}
              placeholder="Select a role"
              triggerLeftIcon={Users}
              value={field.value}
              onValueChange={field.onChange}
              disabled={isSubmitting}
              error={errors.role?.message}
            />
          )}
        />
        <SubmitButton type="submit" isLoading={isSubmitting} disabled={isSubmitting} className="mt-2">
          Sign In
        </SubmitButton>
        {apiError && (
          <p className="mt-2 text-sm text-center text-destructive">
            {apiError}
          </p>
        )}
      </form>
    </MainAppLayout>
  );
};

export default LoginPage;
