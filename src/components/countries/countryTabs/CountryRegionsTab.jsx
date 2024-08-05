import { useState } from "react";
import Button from "../../base/Button";
import RegionsTable from "../tables/regionsTable/RegionsTable";
import Pagination from "../tables/Pagination";
import Modal from "../../base/Modal";
import AddRegion from "../../forms/AddRegion";
import SearchFilter from "../../base/SearchFilter";

function CountryRegions({
  country,
  regionsList,
  pagination,
  handlePageChange,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = () => {
    openModal();
  };

  const filteredRegions = regionsList.filter((region) => {
    const matchesSearchQuery =
      region.name?.ar?.includes(searchQuery) ||
      region.name?.en?.includes(searchQuery);
    const matchesFilterOptions =
      filterOptions.length === 0 ||
      filterOptions.some(
        (option) => option === (region.active ? "نشط" : "غير نشط")
      );
    return matchesSearchQuery && matchesFilterOptions;
  });

  return (
    <div className="flex-col space-y-6">
      <div className="flex justify-between">
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
        <Button
          placeholder="إضافة منطقة"
          onClick={handleModalClick}
          btnStyle="primary"
        />
      </div>

      <RegionsTable regionsList={filteredRegions} />
      {pagination.total_pages > 1 && (
        <Pagination
          currentPage={pagination.current_page}
          totalPages={pagination.total_pages}
          onPageChange={handlePageChange}
        />
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddRegion closeModal={closeModal} id={country.id} />
      </Modal>
    </div>
  );
}

export default CountryRegions;
