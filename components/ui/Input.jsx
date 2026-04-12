"use client";

export default function Input({ type = "text", placeholder, className = "", ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-xl outline-none transition 
      focus:ring-2 focus:ring-orange-400 
      ${className}`}
      {...props}
    />
  );
}