import { useState } from "react";
import Button from "../components/base/Button";
import CountriesList from "../components/countries/tables/countriesTable/CountriesList";
import Modal from "../components/base/Modal";
import AddCountry from "../components/forms/AddCountry";
import SearchFilter from "../components/base/SearchFilter";

const Countries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    openModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">الدول والمناطق المضافة</h1>
        <Button
          onClick={handleClick}
          placeholder={"إضافة دولة جديدة"}
          btnStyle="primary"
        />
      </div>
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      <CountriesList searchQuery={searchQuery} filterOptions={filterOptions} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddCountry closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default Countries;
