import { useState } from "react";
import { Message } from "./Message";

export const ChatBox = () => {
  const [messageList, setMessageList] = useState([
    { message: "message", recipient: "Joe Shmoe" },
  ]);

  const handleSubmit = (formValue) => {
    console.log(formValue);
    // post the formValue
    // wait until the response is returned
    // get the new list of messages and display them (change state) (maybe not state since it's updated only when a request is sent - useRef?)
  };

  return (
    <div>
      <div>
        <ul>
          {messageList.map((message, idx) => (
            <li key={idx}>
              <Message messageList={messageList} orientation="right" />
            </li>
          ))}
          <li>map over message divs here (remember to hide li elements) </li>
          <li>Prop: Array for collection of messages</li>
          <li>
            Sender or Receiver? (change change placement of image thumbnail)
          </li>
          <li></li>
        </ul>
      </div>
      <div>
        <form onSubmit={(v) => handleSubmit(v)}>
          <input
            type="text"
            id="message"
            name="message"
            defaultValue="Enter message here"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
