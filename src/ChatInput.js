import { useState } from "react";
import { unstable__Slug as Slug, IconButton, TextInput } from "@carbon/react";
import { Send } from "@carbon/icons-react";
import { callGenerateTextAPI } from "./test";
// import { fetchGit } from "./Helpers/gitFetch";
import axios from "axios";

function ChatInput({ addQuestion, addAnswer }) {
  const [val, setVal] = useState("");
  const [isValid, setisValid] = useState(true);
  const fetchGit = async () => {
    const owner = "carbon-design-system";
    const repo = "carbon";
    const path = "packages/react/src/components/Accordion/Accordion.stories.js";

    const preMessage =
      "You are an AI assistant tasked with creating a comprehensive and user-friendly usage document for a UI component. Analyze the following code snippet and use the guidelines to generate a detailed guide:";
    const guidanceMessage =
      //  "Create a Markdown document titled Menu Component Guide with sections: Description, Purpose, When to Use, When Not to Use, Anatomy, States, Variants, Interactions. Description (3-4 sentences): Explain the Accordion component";
      "Create a Markdown document titled Component Guide with sections: Description, Purpose, When to Use, When Not to Use, Anatomy, States, Variants, and Interactions. Describe the Accordion component, its function, appearance, and behavior. Explain how it improves user experience by organizing information. List scenarios for using an Accordion and when not to, suggesting alternatives. Break down its main parts and describe different states and variants. Detail interactions with mouse, touchscreen, and keyboard. Use Markdown headings and lists, backticks for feature names, clear language, and no code examples or external links. Reference Carbon Design System components if needed, with 15% more detail for clarity. Generate a brief description of [topic] using '#' for headings, '##' for subheadings, '**' for bold text, and '-' for bullet points.\nSeparate paragraphs with a blank line and use numbered lists where appropriate.";
    // Featch realtime code from GitHub

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          const gitCode = atob(response.data.content);
          //Adapted query to include both code and guidance message for Watson
          const prompt =
            preMessage + "\n\n" + gitCode + "\n\n" + guidanceMessage;
          // Pass the Adapted query to Watson
          const finalDoc = callGenerateTextAPI(prompt);
          finalDoc.then((res) => {
            //  addAnswer(res);
            formatAndDisplayText(res);
          });

          return prompt;
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        return "Something went wrong, please try again";
      });
  };

  function formatAndDisplayText(inputText) {
    // Replace HTML special characters to prevent XSS
    function escapeHTML(text) {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // Split the text into lines
    const lines = inputText?.split("\n");

    let formattedText = "";

    lines &&
      lines?.forEach((line, index) => {
        // Handle headers
        if (line.startsWith("## ")) {
          line = line.replace(/^## /, "");
          formattedText += "  " + line + "\n";
        } else if (line.startsWith("# ")) {
          line = line.replace(/^# /, "");
          formattedText += line + "\n";
        } else {
          // Handle bold text
          line = line.replace(/\*\*(.*?)\*\*/g, "$1");

          // Handle bullet points
          if (line.startsWith("- ")) {
            line = "• " + line.slice(2);
          }

          // Move sentences starting with a digit to a new line
          if (/^\d/.test(line)) {
            formattedText += "\n" + line + "\n";
          } else {
            // If the previous line was a header, add a newline
            if (
              index > 0 &&
              (lines[index - 1].startsWith("# ") ||
                lines[index - 1].startsWith("## "))
            ) {
              formattedText += "\n";
            }
            formattedText += line + "\n";
          }
        }
      });

    addAnswer(formattedText);
  }

  const slug = <Slug></Slug>;

  const onChange = (e) => setVal(e.target.value);
  const send = () => {
    if (isUrlValid(val)) {
      setisValid(true);
      addQuestion(val);
      const check = fetchGit();
    } else {
      setisValid(false);
    }
  };

  const isUrlValid = (value) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );
    return pattern.test(value);
  };

  return (
    <div className="chat-input-wrapper">
      <TextInput
        id="input"
        slug={slug}
        onChange={onChange}
        placeholder="Enter your text here"
        type="url"
        labelText="Enter Url"
        invalid={!isValid}
        invalidText={"Please enter a valid Url"}
      />
      <IconButton
        label="Send"
        className={isValid ? "send-button" : "send-button-invalid"}
        size="md"
        onClick={send}
      >
        <Send />
      </IconButton>
    </div>
  );
}

export default ChatInput;
