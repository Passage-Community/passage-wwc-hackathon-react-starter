import { useState } from "react";
import { faker } from "@faker-js/faker";
import { Avatar } from "./Avatar";
import styles from "../styles/ChatBox.module.css";
import {LoadingSpinner} from "./LoadingSpinner";

const MessageCard = ({ content, user, cardOrientation }) => {
  return (
    <>
      <div>{content}</div>
      <div className={styles.userInfo}>
        <Avatar text={user.userName} />
        <span className={styles.userName}>{user.userName}</span>
        {user.firstName}
      </div>
    </>
  );
};

export const ChatBox = () => {
  let msgList = [];
  const [isLoading, setIsLoading] = useState(false);

  const generateSeedData = (qty) => {
    while (msgList.length <= qty) {
      msgList.push({
        content: faker.lorem.sentences({ min: 1, max: 3 }),
        user: {
          userName: faker.internet.userName(),
          firstName: faker.person.firstName(),
        },
      });
    }
  };

  generateSeedData(2);

  const handleSubmit = (formValue) => {
    console.log(formValue);
    setIsLoading(true)
    // post the formValue
    // setLoading to true
    // wait until the response is returned
    // setLoading to false
    // get the new list of messages and display them (change state) (maybe not state since it's updated only when a request is sent - useRef? useQuery?)
  };

  return (
    <div className={styles.container}>
      <div>
        <ul>
          {msgList && // if the msgList is empty, don't try to render it. Otherwise, it will break when compiling
            msgList.map((message, idx) => (
              // reason for mapping <li> instead of just <div>: semantic markup improves accessibility for users that require screen-readers
              <li key={idx}>
                <MessageCard
                  content={message.content}
                  user={message.user}
                  orientation="right"
                />
              </li>
            ))}
        </ul>
      </div>
      <div>
        <form onSubmit={(v) => handleSubmit(v)}>
          <input
            type="text"
            id="message"
            name="message"
            placeholder="Enter message here"
          />
          {isLoading ? <LoadingSpinner /> : <button type="submit">Send</button>}
        </form>
      </div>
    </div>
  );
};
