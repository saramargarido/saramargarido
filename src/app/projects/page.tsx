"use client";
import { FullClose } from "@/assets/icons";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import styles from "./styles.module.css";

const suggestionsList = [
  "CSS3",
  "HTML5",
  "JAVASCRIPT",
  "React.js",
  "Next.js",
  "PHP",
  "Laravel",
  "Vue.js",
  "Angular",
  "React Native",
];

export default function Projects(suggestions: string[]) {
  const [inputValue, setInputValue] = useState<string>("+ Adicionar tag");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (inputValue === "+ Adicionar tag") {
      setInputValue("");
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (inputValue === "") {
      setInputValue("+ Adicionar tag");
    }
  };

  // Atualiza a lista de sugestões com base no input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /\+\sAdicionar\s+tag/;
    setInputValue(value.replace(regex, ""));

    if (value.length > 0) {
      const filtered = suggestionsList.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  // Adiciona uma nova tag ao clicar na sugestão ou pressionar "Enter"
  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setInputValue("+ Adicionar tag");
    setFilteredSuggestions([]);
  };

  // Remove uma tag ao clicar no botão de deletar
  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.length > 0) {
      handleAddTag(inputValue);
    }
  };

  return (
    <div className={styles.autocompleteTagInput}>
      <div className={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <div key={index} className={styles.tag}>
            {tag}
            <button onClick={() => handleDeleteTag(tag)}>
              <FullClose size="1.25rem" />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.input}
        />
      </div>

      {filteredSuggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleAddTag(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
