import React from "react";
import { Button, FormControlLabel, Checkbox } from "@mui/material";
import ReactHtmlParser from "html-react-parser";
import { Message } from "../../types/types";
import styles from "../../styles/Chat.module.css";

interface MessageItemProps {
  message: Message;
  handleSelection: (option: string) => void;
  handleMultipleSelectionChange: (option: string) => void;
  multipleSelections: string[];
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  handleSelection,
  handleMultipleSelectionChange,
  multipleSelections,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: message.role === "You" ? "flex-end" : "flex-start",
      }}
    >
      <div
        className={
          message.role === "You" ? styles.userMessage : styles.kapAdvisorMessage
        }
      >
        {message.content.trim() !== "" && ReactHtmlParser(message.content)}
      </div>
      {message.type === "single-select" &&
        message.complement &&
        message.complement.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleSelection(option)}
            variant="outlined"
            className={styles.selectionButton}
          >
            {option}
          </Button>
        ))}
      {message.type === "multiple-selection" &&
        message.complement &&
        message.complement.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={multipleSelections.includes(option)}
                onChange={() => handleMultipleSelectionChange(option)}
                name={option}
                color="primary"
              />
            }
            label={option}
          />
        ))}
    </div>
  );
};

export default MessageItem;
