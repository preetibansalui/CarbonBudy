import { Tile, unstable__Slug as Slug } from "@carbon/react";
import ReactMarkdown from "react-markdown";

function Answer({ children }) {
  const slug = <Slug></Slug>;

  return (
    <div className="answer-wrapper">
      <Tile slug={slug} id="answer-1" className="answer-tile">
        {/* {children} */}
        <ReactMarkdown>{children}</ReactMarkdown>
      </Tile>
    </div>
  );
}

export default Answer;
