import { useState, useEffect, useRef } from "react";
import DropdownMenu from "./DropdownMenu";
import Input from "../Input";
import chevronIcon from "../../../assets/chevron-down.svg";

const Dropdown = ({
  leadingIcon,
  leadingIconAlt,
  trailingIcon = chevronIcon,
  options,
  type,
  value,
  setValue,
  label,
  required,
  feedbackMsg,
  multiSelect,
  header,
  placeholder,
  footer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionSelect = (selectedValue) => {
    setValue(selectedValue);
    if (!multiSelect) {
      setIsOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative bg-white-900">
      <div onClick={handleToggle} className="cursor-pointer">
        <Input
          leadingIcon={leadingIcon}
          leadingIconAlt={leadingIconAlt}
          placeholder={placeholder}
          label={label}
          required={required}
          value={multiSelect ? value.join(", ") : value} // Display selected options
          readOnly
          trailingIcon={trailingIcon}
          type={type}
          onChange={() => {}}
          feedbackMsg={feedbackMsg}
        />
      </div>
      {isOpen && (
        <div className="absolute min-w-60 w-full top-full z-10">
          <DropdownMenu
            options={options}
            onOptionSelect={handleOptionSelect}
            multiSelect={multiSelect}
            header={header}
            footer={footer}
            value={value} // Pass the current value
            setValue={setValue} // Pass the setValue function
          />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
