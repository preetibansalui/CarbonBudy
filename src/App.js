import { useState } from "react";
import "./App.css";
import ChatInput from "./ChatInput";
import Question from "./Question";
import Answer from "./Answer";
import "./styles.scss";

function App() {
  const [listOfData, setListOfData] = useState([]);

  const addQuestion = (newQuestion) =>
    setListOfData(data => [...data, { ques: newQuestion }]);
  const addAnswer = (newAnswer) =>
    setListOfData(data => [...data, { ans: newAnswer }]);
  return (
    <>
      <ChatInput addQuestion={addQuestion} addAnswer={addAnswer} />
      <div className="chat-wrapper">
        {listOfData.length > 0 &&
          listOfData.map((data) => {
            return data.ques ? (
              <Question>{data.ques}</Question>
            ) : (
              <Answer>{data.ans}</Answer>
            );
          })}
      </div>
    </>
  );
}

export default App;
