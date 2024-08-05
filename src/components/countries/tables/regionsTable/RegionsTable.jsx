import Button from "../../../base/Button";
import optionsIcon from "../../../../assets/options-vertical.svg";
import Badge from "../../../base/Badge";

function RegionsTable({ regionsList }) {
  const headerStyle =
    "border-b border-gray-200 px-4 py-4 bg-gray-100 font-medium";
  const cellStyle = "border-b border-gray-100 px-4 py-2";

  return (
    <div className="border-collapse border border-gray-200 overflow-hidden rounded-xl">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className={`${headerStyle} text-right`}>
              الاسم باللغة العربية
            </th>
            <th className={`${headerStyle} text-right`}>
              الاسم باللغة الانجليزية
            </th>
            <th className={`${headerStyle} text-right`}>حالة المنطقة</th>
            <th className={`${headerStyle} text-right`}>الإعدادات</th>
          </tr>
        </thead>
        <tbody>
        {regionsList.length > 0 ? (
            regionsList.map((region, index) => (
              <tr key={index}>
                <td className={`${cellStyle} text-right`}>{region.name.ar}</td>
                <td className={`${cellStyle} text-right`}>{region.name.en}</td>
                <td className={`${cellStyle} text-right`}>
                  <Badge active={region.active} />
                </td>
                <td className={`${cellStyle} text-right`}>
                  <Button
                    leadingIcon={optionsIcon}
                    leadingIconAlt="options-icon"
                    btnStyle="secondary"
                    className="border-0"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={`${cellStyle} text-center text-xl font-semibold`}>
                لا توجد مناطق متاحة
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RegionsTable;
