export const Avatar = ({ text, bgColor }) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const textColor = "F9FAFB";
  return (
    <img
      src={`https://ui-avatars.com/api/?name=${text}&format=svg&background=${
        bgColor ?? randomColor
      }&color=${textColor}`}
      alt="Avatar"
      style={{ borderRadius: 100 }}
    />
  );
};
