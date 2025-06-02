import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface MainAppLayoutProps {
  children: React.ReactNode;
  /** Custom className for the main wrapper div that spans the screen */
  className?: string;
  /** Custom className for the Card component that contains the content */
  cardClassName?: string;
  /** Custom className for the CardContent component */
  cardContentClassName?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  className,
  cardClassName,
  cardContentClassName
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center w-full h-screen bg-background',
        className
      )}
    >
      <Card
        className={cn(
          'w-[300px]', // As per Layout Requirements: mainContent.layout width
          // Shadcn Card defaults: bg-card (maps to bg-surface), rounded-lg (maps to project's 6px rounded-md), shadow-sm, border.
          // These defaults align with Layout Requirements: mainContent.container.
          cardClassName
        )}
      >
        <CardContent
          className={cn(
            'p-4', // As per Layout Requirements: mainContent.container padding
            'flex flex-col gap-4', // As per Layout Requirements: mainContent.layout flex properties
            cardContentClassName
          )}
        >
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default MainAppLayout;
