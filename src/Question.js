import { Tile } from "@carbon/react";

function Question({children}) {

  return (
    <div className="question-wrapper">
      <Tile id="question-1" className="question-tile">
        {children}
      </Tile>
    </div>
  );
}

export default Question;
