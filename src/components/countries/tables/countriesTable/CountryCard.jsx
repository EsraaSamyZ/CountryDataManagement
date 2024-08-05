import { useNavigate } from 'react-router-dom';

import Badge from "../../../base/Badge"

const CountryCard = ({id, countryNameAr, countryNameEn, active}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/countries/${id}`);
  };

  return (
    <div onClick={handleClick} className='w-full px-4 py-8 border bg-gray-50 w-fit rounded-2xl space-y-1 cursor-pointer'>
        <Badge active={active} />
        <p className='font-bold md:text-xl'>{countryNameAr}</p>
        <p className='text-md text-gray-600'>{countryNameEn}</p>
    </div>
  )
}

export default CountryCard