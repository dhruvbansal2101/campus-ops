"use client";

import { motion } from "framer-motion";

export default function Button({ children, className = "", ...props }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={`w-full bg-orange-500 text-white py-3 rounded-xl shadow-md hover:bg-orange-600 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}