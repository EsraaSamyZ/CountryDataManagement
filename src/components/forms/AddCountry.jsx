import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCountry } from "../../redux/countries/actions";
import Button from "../base/Button";
import Dropdown from "../base/dropdown/Dropdown";
import Input from "../base/Input";
import Loading from "../Loading";

const statusOptions = [{ value: "نشط" }, { value: "غير نشط" }];

const AddCountry = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { loading, error, postSuccess } = useSelector(
    (state) => state.countries
  );

  const [countryNameEn, setCountryNameEn] = useState("");
  const [countryNameAr, setCountryNameAr] = useState("");
  const [regionNameEn, setRegionNameEn] = useState("");
  const [regionNameAr, setRegionNameAr] = useState("");
  const [active, setActive] = useState(statusOptions[0].value);
  const [validationErrors, setErrors] = useState({});

  const [codes, setCodes] = useState([]);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const generateUniqueCode = () => {
    let code;
    do {
      code =
        characters.charAt(Math.floor(Math.random() * characters.length)) +
        characters.charAt(Math.floor(Math.random() * characters.length));
    } while (codes.includes(code));

    setCodes([...codes, code]);
    return code;
  };

  const validate = () => {
    const newErrors = {};
  
    const arabicPattern = /^[\u0600-\u06FF\s'-]+$/;
    const englishPattern = /^[a-zA-Z\s'-]+$/;
  
    if (!countryNameEn.trim())
      newErrors.countryNameEn = "يجب ملء هذا الحقل";
    else if (!englishPattern.test(countryNameEn.trim()))
      newErrors.countryNameEn = "يجب أن يحتوي الاسم على حروف إنجليزية فقط";
  
    if (!countryNameAr.trim())
      newErrors.countryNameAr = "يجب ملء هذا الحقل";
    else if (!arabicPattern.test(countryNameAr.trim()))
      newErrors.countryNameAr = "يجب أن يحتوي الاسم على حروف عربية فقط";
  
    if (!regionNameEn.trim())
      newErrors.regionNameEn = "يجب ملء هذا الحقل";
    else if (!englishPattern.test(regionNameEn.trim()))
      newErrors.regionNameEn = "يجب أن يحتوي الاسم على حروف إنجليزية فقط";
  
    if (!regionNameAr.trim())
      newErrors.regionNameAr = "يجب ملء هذا الحقل";
    else if (!arabicPattern.test(regionNameAr.trim()))
      newErrors.regionNameAr = "يجب أن يحتوي الاسم على حروف عربية فقط";
  
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
        en: countryNameEn.trim(),
        ar: countryNameAr.trim(),
      },
      region_label: {
        en: regionNameEn.trim(),
        ar: regionNameAr.trim(),
      },
      active: active === "نشط",
      code: generateUniqueCode(),
    };

    dispatch(postCountry(countryData));
  };

  useEffect(() => {
    if (postSuccess) {
      closeModal();
    }
  }, [postSuccess, closeModal]);

  return (
    <div className="flex-col space-y-5">
      <div className="flex-col space-y-4">
        <h2 className="text-xl font-bold w-fit m-auto">إضافة دولة</h2>
        <h3 className="text-gray-400 text-sm font-semibold w-fit m-auto">
          يرجى إدخال المعلومات المطلوبة للدولة لاضافتها
        </h3>
      </div>

      <form className="flex-col space-y-5" onSubmit={handleSubmit}>
        <Input
          label="اسم الدولة باللغة العربية"
          placeholder="اسم الدولة باللغة العربية"
          type="text"
          value={countryNameAr}
          onChange={(e) => setCountryNameAr(e.target.value)}
          feedbackMsg={validationErrors.countryNameAr || ""}
        />
        <Input
          label="اسم الدولة باللغة الانجليزية"
          placeholder="اسم الدولة باللغة الانجليزية"
          type="text"
          value={countryNameEn}
          onChange={(e) => setCountryNameEn(e.target.value)}
          feedbackMsg={validationErrors.countryNameEn || ""}
        />
        <Input
          label="اسم حقل المنطقه باللغة العربية"
          placeholder="اسم حقل المنطقه باللغة العربية"
          type="text"
          value={regionNameAr}
          onChange={(e) => setRegionNameAr(e.target.value)}
          feedbackMsg={validationErrors.regionNameAr || ""}
        />
        <Input
          label="اسم حقل المنطقه باللغة الانجليزية"
          placeholder="اسم حقل المنطقه باللغة الانجليزية"
          type="text"
          value={regionNameEn}
          onChange={(e) => setRegionNameEn(e.target.value)}
          feedbackMsg={validationErrors.regionNameEn || ""}
        />
        <Dropdown
          label="حالة الدولة"
          required
          options={statusOptions}
          type="text"
          value={active}
          setValue={setActive}
        />
        <div className="w-fit m-auto">
          <Button
            type="submit"
            placeholder={loading ? "إضافة. . ." : "إضافة"}
            btnStyle="primary"
          />
        </div>
        {loading && <Loading loading={loading}/>}
        {error && <p className="text-red-500 font-bold">{error.message? error.message : error}</p>}
      </form>
    </div>
  );
};

export default AddCountry;
