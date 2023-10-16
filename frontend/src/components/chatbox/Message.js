export const Message = ({content, user, cardOrientation}) => {
  return <div style={{gridTemplateColumns: 2}}>
    <div>{content}</div>
    <div>{user}</div>
  </div>;
};
