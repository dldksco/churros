const Card = (props) => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ width: "100%", height: "67vh" }}
    >
      {props.children}
    </div>
  );
};

export default Card;
