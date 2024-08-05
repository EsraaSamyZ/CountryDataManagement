const Badge = ({active}) => {

  const status = active ? 'نشط' : 'غير نشط';
    return (
    <div className={`w-fit px-2 py-0.5 ${active ? 'bg-green-50 text-green-800 border-green-800' : 'bg-red-50 text-red-800 border-red-800'} text-sm rounded-lg border`}>{status}</div>
  )
}

export default Badge