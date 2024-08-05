import searchIcon from "../../assets/search.svg";
import funnelIcon from "../../assets/funnel.svg";
import Input from "./Input";
import Dropdown from "./dropdown/Dropdown";

const statusOptions = [{ value: "نشط" }, { value: "غير نشط" }];

const SearchFilter = ({ searchQuery, setSearchQuery, filterOptions, setFilterOptions }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center">
      <div className="ml-2 md:max-w-80 sm:w-full">
        <Input
          leadingIcon={searchIcon}
          leadingIconAlt="Search"
          placeholder="البحث"
          value={searchQuery}
          onChange={handleInputChange}
          type="text"
        />
      </div>
      <div className="w-12">
        <Dropdown
          header="حالة المنطقة"
          leadingIcon={funnelIcon}
          leadingIconAlt="funnel-icon"
          options={statusOptions}
          value={filterOptions}
          setValue={setFilterOptions}
          multiSelect
          trailingIcon={false}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
