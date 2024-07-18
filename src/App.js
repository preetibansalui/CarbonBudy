import { useState } from "react";
import "./App.css";
import ChatInput from "./ChatInput";
import Question from "./Question";
import Answer from "./Answer";
import "./styles.scss";
import { Loading } from "@carbon/react";

function App() {
  const [listOfData, setListOfData] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  const addQuestion = (newQuestion) => {
    setShowLoading(true)
    setListOfData((data) => [...data, { ques: newQuestion }]);
  }
  const addAnswer = (newAnswer) => {
    setShowLoading(false)
    setListOfData((data) => [...data, { ans: newAnswer }]);
  }
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
         { showLoading && <Loading/>}
      </div>
    </>
  );
}

export default App;
