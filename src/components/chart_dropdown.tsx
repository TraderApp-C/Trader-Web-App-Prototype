import { useState, useRef, useEffect, FC, MouseEvent } from 'react';

const CustomDropdown: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const options: string[] = ['Option 1', 'Option 2', 'Option 3'];

  const toggleDropdown = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setIsOpen((prev: boolean) => !prev);
  };

  const handleSelect = (option: string): void => {
    setSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | globalThis.MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <div
        onClick={toggleDropdown}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
          background: 'green',
        }}
      >
        {selected || 'Select an option'}
      </div>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1,
            background: 'green',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginTop: '5px',
            width: '100%',
          }}
        >
          {options.map((option: string) => (
            <div
              key={option}
              onClick={(e: MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                handleSelect(option);
              }}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;