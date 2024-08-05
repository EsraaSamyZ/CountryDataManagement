
const Icon = ({ src, alt, ...props }) => {
    return (
      <img src={src} alt={alt} {...props} />
    );
  };

export default Icon