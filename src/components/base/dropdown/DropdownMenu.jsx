import Button from "../Button";

const DropdownMenu = ({
  options,
  onOptionSelect,
  multiSelect = false,
  header,
  footer,
  value,
  setValue,
}) => {
  const handleOptionClick = (optionValue) => {
    if (multiSelect) {
      setValue((prevSelectedOptions) => {
        let updatedSelectedOptions;
        if (prevSelectedOptions.includes(optionValue)) {
          updatedSelectedOptions = prevSelectedOptions.filter(
            (option) => option !== optionValue
          );
        } else {
          updatedSelectedOptions = [...prevSelectedOptions, optionValue];
        }
        // console.log(updatedSelectedOptions);
        onOptionSelect(updatedSelectedOptions);
        return updatedSelectedOptions;
      });
    } else {
      setValue([optionValue]);
      onOptionSelect(optionValue);
    }
  };

  return (
    <div className="flex-col space-y-4 border rounded-lg border-gray-300 bg-white overflow-hidden">
      {header && (
        <div className="pt-3 px-3 font-bold">
          <h4>{header}</h4>
        </div>
      )}
      <div>
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => handleOptionClick(option.value)} 
            className="flex justify-between items-center py-1.5 px-3 hover:bg-gray-100 border-b cursor-pointer"
          >
            <p>
              {option.value}
            </p>
            {multiSelect && (
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={(e) => (e)}
                className="mr-2 h-4 w-4 appearance-none checked:bg-purple-700 border rounded cursor-pointer"
              />
            )}
          </div>
        ))}
      </div>
      {footer && (
        <div className="flex bg-gray-100 p-4">
          <Button className="w-20 ml-2" placeholder={"تأكيد"} btnStyle="primary" />
          <Button className="w-20" placeholder={"الغاء"} btnStyle="secondary" />
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
