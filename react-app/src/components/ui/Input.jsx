import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-lexora-gray-300 mb-2">{label}</label>
    )}
    <input
      ref={ref}
      className={`input-lexora ${error ? 'border-red-500/50 focus:border-red-500' : ''} ${className}`}
      {...props}
    />
    {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
  </div>
));

Input.displayName = 'Input';
export default Input;
