import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CountryDetails from "../components/countries/countryTabs/CountryDetailsTab";
import CountryRegions from "../components/countries/countryTabs/CountryRegionsTab";
import { fetchRegions } from "../redux/regions/actions";
import Loading from "../components/Loading";


const Country = () => {
  const dispatch = useDispatch();
  const { loading, regions, error } = useSelector((state) => state.regions);
  const [currentPage, setCurrentPage] = useState(1);

  const { id } = useParams();
  const countries = useSelector((state) => state.countries.countries.data);
  const [country, setCountry] = useState(null);

  const [activeTab, setActiveTab] = useState("countryDetails");

  useEffect(() => {
    const selectedCountry = countries?.find(
      (country) => country.id === parseInt(id)
    );
    setCountry(selectedCountry);
  }, [id, countries]);

  useEffect(() => {
    dispatch(fetchRegions(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= regions.meta.pagination.total_pages) {
      setCurrentPage(page);
    }
  };

  if (loading || error || !country) return <Loading loading={loading} error={error? error : "Country Not Found"}/>;

  const regionsArr = Array.isArray(regions.data) ? regions.data : [];
  const pagination = regions?.meta?.pagination || {};

  const renderContent = () => {
    switch (activeTab) {
      case "countryDetails":
        return <CountryDetails country={country} regionsList={regionsArr}/>;
      case "countryRegions":
        return <CountryRegions country={country} regionsList={regionsArr} pagination={pagination} handlePageChange={handlePageChange}/>;
      default:
        return null;
    }
  };

  const tabStyle = `px-4 py-2 -mb-px text-gray-900 font-semibold`;

  return (
    <div>
      <div className="border-b-2">
        <button
          className={`${tabStyle} ${activeTab === "countryDetails" ? "border-b-4 border-teal-400" : ""}`}
          onClick={() => setActiveTab("countryDetails")}
        >
          معلومات الدولة
        </button>
        <button 
        className={`${tabStyle} ${activeTab === "countryRegions" ? "border-b-4 border-teal-400" : ""}`}
        onClick={() => setActiveTab("countryRegions")}>
          المناطق
        </button>
      </div>
      <div className="content mt-5">{renderContent()}</div>
    </div>
  );
};

export default Country;
