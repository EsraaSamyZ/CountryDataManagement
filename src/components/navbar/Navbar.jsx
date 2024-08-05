import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [countryName, setCountryName] = useState('');

  const extractIdFromPath = (path) => {
    const match = path.match(/^\/countries\/(\d+)$/);
    return match ? match[1] : null;
  };

  const id = extractIdFromPath(currentPath);

  const countryData = useSelector((state) => state.countries || {});
  
  useEffect(() => {
    if (id) {
      const country = countryData?.countries?.data.find((country) => country.id == id);
      if (country) {
        setCountryName(country.name.ar);
      }
    }
  }, [id, countryData]);

  const breadcrumbMappings = {
    '/countries': [
      { label: 'الدول والمناطق', link: '/countries' },
    ],
    '/countries/:id': [
      { label: 'الدول والمناطق', link: '/countries' },
      { label: countryName || 'اسم الدولة', link: '' },
    ],
  };

  const getBreadcrumbItems = (path) => {
    for (const pattern in breadcrumbMappings) {
      const regex = new RegExp(`^${pattern.replace(/:\w+/g, '\\d+')}$`); 
      if (regex.test(path)) {
        return breadcrumbMappings[pattern];
      }
    }
    return [];
  };

  const breadcrumbItems = getBreadcrumbItems(currentPath);

  return (
    <nav className="bg-gray-100 w-full">
      <div dir="rtl" className="h-12 content-center w-10/12 m-auto">
        <Breadcrumb items={breadcrumbItems} currentPath={currentPath} />
      </div>
    </nav>
  );
};

export default Navbar;
