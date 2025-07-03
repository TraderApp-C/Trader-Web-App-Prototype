import React, { ReactNode } from 'react';
import './app_buttons.css';


interface ButtonProps {
  text: string;
  onClick: () => void;
  style?: React.CSSProperties;  
  className?: string;  
  disabled?: boolean; 
  children?: ReactNode;
}

const AppButton: React.FC<ButtonProps> = ({ text, onClick, style, className, disabled, children, ...props }) => {
  return (
    <button
      onClick={onClick}
      style={{
        
        ...style
      }}  
      className={`btn ${className}`} 
      disabled={disabled}
      {...props}
    >
      {children == null ? text : children}
      
    </button>
  );
};

export default AppButton;