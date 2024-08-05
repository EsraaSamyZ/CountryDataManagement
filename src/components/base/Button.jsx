import Icon from "./Icon";

const Button = ({
  leadingIcon,
  leadingIconAlt,
  onClick,
  placeholder,
  btnStyle = "primary",
  className
}) => {
  const primaryStyle = `bg-purple-700 px-4 py-2 rounded-full text-white hover:bg-purple-900 ${className}`;
  const secondaryStyle = `h-10 bg-transparent px-2 py-2 rounded-full border border-gray-400 hover:bg-gray-50 ${className}`;

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center ${btnStyle === "primary" ? primaryStyle : secondaryStyle}`}
    >
      {leadingIcon && (
        <div className="w-7 h-7">
          <Icon className="p-1" src={leadingIcon} alt={leadingIconAlt} />
        </div>
      )}
      {placeholder && placeholder}
    </button>
  );
};

export default Button;
