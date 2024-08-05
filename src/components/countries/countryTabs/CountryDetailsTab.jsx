import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCountry } from "../../../redux/countries/actions";
import Input from "../../base/Input";
import Button from "../../base/Button";
import Dropdown from "../../base/dropdown/Dropdown";
import Loading from "../../Loading";

const statusOptions = [{ value: "نشط" }, { value: "غير نشط" }];

function CountryDetails({ country }) {

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.countries);

  const [nameEn, setNameEn] = useState(country.name?.en || "");
  const [nameAr, setNameAr] = useState(country.name?.ar || "");
  const [regionEn, setRegionEn] = useState(country.region_label?.en || "");
  const [regionAr, setRegionAr] = useState(country.region_label?.ar || "");
  const [active, setActive] = useState(statusOptions[0].value);
  const [validationErrors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
  
    const arabicPattern = /^[\u0600-\u06FF\s'-]+$/;
    const englishPattern = /^[a-zA-Z\s'-]+$/;
  
    if (!nameEn.trim())
      newErrors.nameEn = "يجب ملء هذا الحقل";
    else if (!englishPattern.test(nameEn.trim()))
      newErrors.nameEn = "يجب أن يحتوي الاسم على حروف إنجليزية فقط";
  
    if (!nameAr.trim())
      newErrors.nameAr = "يجب ملء هذا الحقل";
    else if (!arabicPattern.test(nameAr.trim()))
      newErrors.nameAr = "يجب أن يحتوي الاسم على حروف عربية فقط";
  
    if (!regionEn.trim())
      newErrors.regionEn = "يجب ملء هذا الحقل";
    else if (!englishPattern.test(regionEn.trim()))
      newErrors.regionEn = "يجب أن يحتوي الاسم على حروف إنجليزية فقط";
  
    if (!regionAr.trim())
      newErrors.regionAr = "يجب ملء هذا الحقل";
    else if (!arabicPattern.test(regionAr.trim()))
      newErrors.regionAr = "يجب أن يحتوي الاسم على حروف عربية فقط";
  
    return newErrors;
  };

  const handleSubmit = (e) => {
    setErrors({});
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const countryData = {
      name: {
        en: nameEn.trim(),
        ar: nameAr.trim(),
      },
      region_label: {
        en: regionEn,
        ar: regionAr,
      },
      active: active === "نشط",
      code: country.code,
    };

    dispatch(updateCountry(countryData, country.id));
  };

  return (
    <form
      className="grid grid-flow-row md:grid-rows-2 md:grid-flow-col gap-5 pb-20 relative"
      onSubmit={handleSubmit}
    >
      <Input
        label="اسم الدولة باللغة العربية"
        placeholder="اسم الدولة باللغة العربية"
        type="text"
        value={nameAr}
        onChange={(e) => setNameAr(e.target.value)}
        feedbackMsg={validationErrors.nameAr || ""}
      />
      <Input
        label="اسم الدولة باللغة الانجليزية"
        placeholder="اسم الدولة باللغة الانجليزية"
        type="text"
        value={nameEn}
        onChange={(e) => setNameEn(e.target.value)}
        feedbackMsg={validationErrors.nameEn || ""}
      />
      <Input
        label="اسم حقل المنطقه باللغة العربية"
        placeholder="اسم حقل المنطقه باللغة العربية"
        type="text"
        value={regionAr}
        onChange={(e) => setRegionAr(e.target.value)}
        feedbackMsg={validationErrors.regionAr || ""}
      />
      <Input
        label="اسم حقل المنطقه باللغة الانجليزية"
        placeholder="اسم حقل المنطقه باللغة الانجليزية"
        type="text"
        value={regionEn}
        onChange={(e) => setRegionEn(e.target.value)}
        feedbackMsg={validationErrors.regionEn || ""}
      />
      <Dropdown
        label="حالة الدولة"
        options={statusOptions}
        type="text"
        value={active}
        setValue={setActive}
      />
      <div className="absolute bottom-4 left-4 w-fit m-auto">
        <Button
          type="submit"
          placeholder={loading ? "حفظ التغييرات. . ." : "حفظ التغييرات"}
          btnStyle="primary"
        />
      </div>
      {loading && <Loading loading={loading}/>}
      {error && <p className="text-red-500 font-bold">{error.message? error.message : error}</p>}
    </form>
  );
}

export default CountryDetails;

