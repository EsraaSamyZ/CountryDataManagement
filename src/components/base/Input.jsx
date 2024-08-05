import { useState } from "react";
import Icon from "./Icon";

const Input = ({
  label,
  leadingIcon,
  leadingIconAlt,
  type,
  trailingIcon,
  trailingIconAlt,
  feedbackMsg,
  placeholder,
  value,
  onChange,
  onClick,
  required,
  readOnly,
  disabled,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const inputStyle = `border rounded-lg flex items-center px-2 h-10 w-full space-x-2 ${
    isFocused ? "border-purple-900 border-2" : "border-gray-300"
  } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`;

  return (
    <div className="flex-col space-y-1.5 ">
      {(label || required) && (
        <div className="flex">
          {label && <h4>{label}</h4>}
          {required && (
            <p className="text-red-500 text-sm font-bold">*</p>
          )}
        </div>
      )}
      <div className={inputStyle}>
        {leadingIcon && (
          <div className="w-8 h-8">
            <Icon className="p-1" src={leadingIcon} alt={leadingIconAlt} />
          </div>
        )}
        {type && (
          <div className="w-full flex items-center justify-between">
            <input
              className="grow border-none outline-none bg-transparent p-0 m-0 text-inherit placeholder-gray-500"
              placeholder={placeholder}
              value={value}
              type={type}
              onChange={onChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              readOnly={readOnly}
              onClick={onClick}
            />
            {trailingIcon && (
              <div className="w-7 h-7 ml-2">
                <Icon
                  className="p-1"
                  src={trailingIcon}
                  alt={trailingIconAlt}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {feedbackMsg && <p className="text-red-500">{feedbackMsg}</p>}
    </div>
  );
};

export default Input;
