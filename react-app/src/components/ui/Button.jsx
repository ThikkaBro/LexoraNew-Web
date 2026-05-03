import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-lexora-gold text-lexora-black hover:bg-lexora-gold-light font-semibold',
  outline: 'border border-lexora-gold text-lexora-gold hover:bg-lexora-gold hover:text-lexora-black font-semibold',
  ghost: 'text-lexora-gray-300 hover:text-lexora-gold font-medium',
};

const sizes = {
  sm: 'px-5 py-2.5 text-sm rounded-lg',
  md: 'px-7 py-3.5 text-base rounded-xl',
  lg: 'px-9 py-4 text-lg rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2
        transition-all duration-300 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </motion.button>
  );
}
