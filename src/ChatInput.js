import { useState } from "react";
import { unstable__Slug as Slug, IconButton, TextInput } from "@carbon/react";
import { Send } from "@carbon/icons-react";
import { generateText } from "./test";
// import { fetchGit } from "./Helpers/gitFetch";
import axios from "axios";

function ChatInput() {
  const [val, setVal] = useState('')
  const [isValid, setisValid] = useState(true)
  const fetchGit = async () => {
    const owner = "carbon-design-system";
    const repo = "carbon";
    const path = "packages/react/src/components/Accordion/Accordion.stories.js";

    const preMessage =
      "You are an AI assistant tasked with creating a comprehensive and user-friendly usage document for a UI component. Analyze the following code snippet and use the guidelines to generate a detailed guide:";
    const postMessage =
      " Guidelines: 1. Document Structure: Create a Markdown document titled Menu Component Guide with the following sections: Description, Purpose, When to Use, When Not to Use, Anatomy, States, Variants, Interactions 2. Description (3-4 sentences): Provide a detailed explanation of what the Accordion component is and its main function. Describe its basic appearance and how it behaves, using analogies if helpful. 3. Purpose (4-5 sentences): Elaborate on how the Accordion improves the user's experience on a website or app. Explain in detail how it helps organize information and why that's beneficial. Discuss common problems it solves and how it enhances user interaction. 4. When to Use (5-6 bullet points): Provide a comprehensive list of scenarios where using an Accordion would be advantageous. Consider various types of content, website layouts, and user needs where it might be particularly useful. For each point, briefly explain why the Accordion is a good choice. 5. When Not to Use (4-5 bullet points): Offer a detailed list of situations where a different design choice might work better. For each point, explain why the Accordion isn't the best fit and suggest an alternative approach or component that might work better. 6. Anatomy (detailed list with descriptions): Break down the Accordion into its main parts (like the overall container, the clickable headers, and the content sections). Provide a thorough explanation of what each part does, how it contributes to the overall functionality, and how users interact with it. 7. States: Describe in detail the different ways the Accordion can appear (like open, closed, or disabled). Explain how users can identify each state, what triggers state changes, and how these states affect the user experience. 8. Variants: If the Accordion comes in different styles or sizes, describe these options comprehensively. Explain when each variant might be used and how it affects the component's appearance and functionality. 9. Interactions: Provide a detailed explanation of how people can use the Accordion with various input methods (mouse, touchscreen, keyboard). Describe what happens during each type of interaction, including any visual feedback or changes in the component's state. Formatting Instructions: Use Markdown for headings and lists. When mentioning specific features or options, put their names in `backticks`. Keep the language clear and simple, avoiding technical terms where possible. If you must use a technical term, provide a brief explanation. Important Notes: 1. Do not include any code examples in your response. Focus on explaining how the Accordion works and how to use it effectively, without getting into the technical details of how to implement it. 2. Do not add any links to external websites. If you need to reference other UI components, use Carbon Design System components. 3. Aim to make your explanations about 15% more detailed than a typical concise response. Provide examples, elaborations, or additional context where appropriate to give a more comprehensive understanding of the Accordion component. Ensure your guide covers all specified aspects of the Accordion based on the provided code, explaining everything in a way that both designers and non-technical people can understand easily while providing a deeper level of detail.";
    // Create the URL for the GitHub API

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          const fileContent = atob(response.data.content);
          //assemble the prompt
          const prompt =
            preMessage + "\n\n" + fileContent + "\n\n" + postMessage;
          console.log("custom promt", prompt);

          return prompt;
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        return "Something went wrong, please try again";
      });
  };

  const slug = <Slug></Slug>;

  const onChange = e => setVal(e.target.value)

  const send = () => {
   if(isUrlValid(val)) {
    setisValid(true)
    fetchGit();
    generateText("tell me about carbon design system");
  } else {
    setisValid(false)
  }
  };

  const isUrlValid = value => {

    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
      'i'
    );
    return pattern.test(value);
   }

  return (
    <div className="chat-input-wrapper">
      <TextInput id="input" slug={slug} onChange={onChange} placeholder="Enter your text here" type="url" labelText="Enter Url" invalid={!isValid} invalidText={'Please enter a valid Url'}/>
      <IconButton label="Send" className={isValid ? "send-button" : "send-button-invalid"} size="md" onClick={send} >
        <Send />
      </IconButton>
    </div>
  );
}

export default ChatInput;
