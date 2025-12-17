import { ReactNode, HTMLAttributes } from 'react';

import css from './Container.module.css';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ 
  children, 
  className,
  ...props 
}: ContainerProps) {
  const containerClasses = `${css.root} ${className || ''}`.trim();
  
  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
}