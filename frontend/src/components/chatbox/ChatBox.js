import { MessageCard } from "./MessageCard";
import { faker } from "@faker-js/faker";

export const ChatBox = () => {
  let msgList = [];

  const generateSeedData = (qty) => {
    while (msgList.length <= qty) {
      msgList.push({
        content: faker.lorem.sentences({ min: 1, max: 3 }),
        user: faker.person.fullName(),
      });
    }
  };

  generateSeedData(10);

  const handleSubmit = (formValue) => {
    console.log(formValue);
    // post the formValue
    // setLoading to true
    // wait until the response is returned
    // setLoading to false
    // get the new list of messages and display them (change state) (maybe not state since it's updated only when a request is sent - useRef? useQuery?)
  };

  return (
    <div>
      <div>
        <ul style={{ padding: 0, margin: 0 }}>
          {msgList && // if the msgList is empty, don't try to render it. Otherwise, it will break when compiling
            msgList.map((message, idx) => (
              // reason for mapping <li> instead of just <div>: semantic markup improves accessibility for users that require screen-readers
              <li key={idx} style={{ listStyleType: "none" }}>
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
        <form
          onSubmit={(v) => handleSubmit(v)}
          style={{ flexDirection: "row" }}
        >
          <input
            type="text"
            id="message"
            name="message"
            defaultValue="Enter message here"
            style={{ height: 100, minWidth: "100%" }}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
