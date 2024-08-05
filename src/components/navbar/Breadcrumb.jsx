import homeIcon from "../../assets/home.svg";
import chevronIcon from "../../assets/chevron.svg";
import Icon from "../base/Icon";

const Breadcrumb = ({ items, currentPath }) => {
  return (
    <ol className="flex items-center">
      <li>
        <a href="/">
          <Icon className="p-1 w-7" src={homeIcon} alt="home-icon" />
        </a>
      </li>
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          <Icon
            className="w-6 rotate-180"
            src={chevronIcon}
            alt="chevron-icon"
          />
          {item.link ? (
            <a href={item.link} className={`font-bold ${item.link === currentPath ? 'text-teal-600' : ''}`}>
              {item.label}
            </a>
          ) : (
            <h3 className={`font-bold ${index === items.length - 1 ? 'text-teal-600' : ''}`}>
              {item.label}
            </h3>
          )}
        </li>
      ))}
    </ol>
  );
};

export default Breadcrumb;

