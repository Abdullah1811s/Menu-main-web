const AvatarButton = () => {
  return (
    <button className="w-10 h-10 rounded-full overflow-hidden">
      <img
        src="/images/p1.png" // replace with your image path
        alt="User Avatar"
        className="w-full h-full object-cover"
      />
    </button>
  );
};
export default AvatarButton