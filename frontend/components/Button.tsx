'use client';

import { motion } from 'framer-motion';
import { VariantProps, cva } from 'class-variance-authority';
import React, { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '../app/utils/utils';
import Image from 'next/image';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  icon?: any;
}

const buttonVariants = cva(
  'justify-center w-full transition ease-out hover:shadow-lg px-6 py-2 text-white  rounded flex  space-y-2',
  {
    variants: {
      variant: {
        default: 'bg-greenpale w-full text-white hover:bg-green-700',
        primary: 'bg-blue-500 w-full text-white hover:bg-blue-600',
        danger: 'bg-red-500 w-full text-white hover:bg-red-600',
        outline:
          'bg-white w-full text-gray-700 border border-slate-300 hover:bg-greenpale hover:text-white hover:border-greenpale',
        disabled: 'bg-green-300 w-full text-white',
      },
    },

    defaultVariants: {
      variant: 'default',
    },
  }
);

const Button: FC<ButtonProps> = ({
  variant,
  className,
  href,
  icon,
  children,
  ...props
}) => {
  if (href) {
    return (
      <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
        {icon ? (
          <a href={href} className={cn(buttonVariants({ variant, className }))}>
            <span className="mr-2">
              {icon ? <Image src={icon} alt={'Icon'} /> : ''}
            </span>
            {children}
          </a>
        ) : (
          <a
            href={href}
            // target="_blank"
            className={cn(buttonVariants({ variant, className }))}
          >
            {children}
          </a>
        )}
      </motion.div>
    );
  }
  return (
    <motion.div
      className="w-full"
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
    >
      <button {...props} className={cn(buttonVariants({ variant, className }))}>
        <div className="flex items-center">
          <span className="mr-2">
            {icon ? <Image src={icon} alt={'Icon'} /> : ''}
          </span>
          {children}
        </div>
      </button>
    </motion.div>
  );
};

export { Button, buttonVariants };
