const Card = ({className, children}) => {
  return (
    <div
      className={`flex justify-center items-center ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
