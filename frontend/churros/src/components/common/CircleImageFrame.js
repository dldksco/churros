const CircleImageFrame = ({ imageUrl }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-24 h-24 rounded-full border-2 border-white overflow-hidden">
        <img
          src={imageUrl}
          alt="User Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default CircleImageFrame;
