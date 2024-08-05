import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../../../redux/countries/actions";
import CountryCard from "./CountryCard";
import Pagination from "../Pagination";
import Loading from "../../../Loading";

const CountriesList = ({ searchQuery, filterOptions }) => {
  const dispatch = useDispatch();
  const { loading, countries, error } = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCountries(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= countries.meta.pagination.total_pages) {
      setCurrentPage(page);
    }
  };

  if (loading || error) return <Loading loading={loading} error={error}/>;

  const countriesArr = Array.isArray(countries.data) ? countries.data : [];
  const pagination = countries?.meta?.pagination || {};

  const filteredCountries = countriesArr.filter((country) => {
    const matchesSearchQuery =
      country.name?.ar?.includes(searchQuery) || country.name?.en?.includes(searchQuery);
    const matchesFilterOptions =
      filterOptions.length === 0 ||
      filterOptions.some((option) => option === (country.active ? "نشط" : "غير نشط"));
    return matchesSearchQuery && matchesFilterOptions;
  });

  return (
    <>
      {filteredCountries.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {filteredCountries.map((country) => (
            <CountryCard
              key={country.id}
              id={country.id}
              countryNameAr={country.name.ar}
              countryNameEn={country.name.en}
              active={country.active}
            />
          ))}
        </div>
      ) : (
        <p className="text-xl font-semibold">لا توجد نتائج مطابقة</p>
      )}
      {pagination.total_pages > 1 && (
        <Pagination
          currentPage={pagination.current_page}
          totalPages={pagination.total_pages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default CountriesList;

