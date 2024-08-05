import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRegion } from "../../redux/regions/actions";
import Button from "../base/Button";
import Dropdown from "../base/dropdown/Dropdown";
import Input from "../base/Input";
import Loading from "../Loading";

const statusOptions = [{ value: "نشط" }, { value: "غير نشط" }];

const AddRegion = ({ closeModal, id }) => {
  const dispatch = useDispatch();
  const { loading, error, postSuccess } = useSelector((state) => state.regions);

  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [active, setActive] = useState(statusOptions[0].value);
  const [validationErrors, setErrors] = useState({});

  const nationalityId = id;

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

    const regionData = {
      name: {
        en: nameEn.trim(),
        ar: nameAr.trim(),
      },
      active: active === "نشط",
      nationality_id: nationalityId,
    };

    dispatch(postRegion(regionData));
  };

  useEffect(() => {
    if (postSuccess) {
      closeModal();
    }
  }, [postSuccess, closeModal]);

  return (
    <div className="flex-col space-y-5">
      <div className="flex-col space-y-4">
        <h2 className="text-xl font-bold w-fit m-auto">إضافة منطقة</h2>
        <h3 className="text-gray-400 text-sm font-semibold w-fit m-auto">
          يرجى إدخال المعلومات المطلوبة للمنطقة لاضافتها
        </h3>
      </div>

      <form className="flex-col space-y-5" onSubmit={handleSubmit}>
        <Input
          label="الاسم باللغة العربية"
          placeholder="الاسم باللغة العربية"
          type="text"
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          feedbackMsg={validationErrors.nameAr || ""}
        />
        <Input
          label="الاسم باللغة الانجليزية"
          placeholder="الاسم باللغة الانجليزية"
          type="text"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          feedbackMsg={validationErrors.nameEn || ""}
        />
        <Dropdown
          label="حالة المنطقة"
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

export default AddRegion;
