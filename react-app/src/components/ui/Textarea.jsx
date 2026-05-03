import { forwardRef } from 'react';

const Textarea = forwardRef(({ label, error, className = '', rows = 4, ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-lexora-gray-300 mb-2">{label}</label>
    )}
    <textarea
      ref={ref}
      rows={rows}
      className={`input-lexora resize-none ${error ? 'border-red-500/50 focus:border-red-500' : ''} ${className}`}
      {...props}
    />
    {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
  </div>
));

Textarea.displayName = 'Textarea';
export default Textarea;
