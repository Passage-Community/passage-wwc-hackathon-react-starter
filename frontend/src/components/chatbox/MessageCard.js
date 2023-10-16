import { Avatar } from "../avatar";

export const MessageCard = ({ content, user, cardOrientation }) => {
  return (
    <div style={{ display: "flex"}}>
      <div>{content}</div>
      <div style={{ flexDirection: "row", justifyContent: "flex-end"}}>
        <Avatar text={user} />
        {user}
      </div>
    </div>
  );
};
