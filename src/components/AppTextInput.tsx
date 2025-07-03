
import React, { ChangeEvent } from 'react';
import './AppTextInput.css';

type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';


interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: InputType;
  style?: React.CSSProperties;  
}

const AppTextInput: React.FC<TextInputProps> = ({
    value,
    onChange,
    placeholder = '',
    type = 'text',
    style
  }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };
  
    return (
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="text-input"
        style={style}
      />
    );
  };
  
  export default AppTextInput;