"use client";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import styles from "./styles.module.css";

const suggestionsList = ["css3", "html5", "javascript", "react", "next"];

export default function Projects(suggestions: string[]) {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [showInput, setShowInput] = useState<boolean>(true);

  // Atualiza a lista de sugestões com base no input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

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
    setInputValue("");
    setFilteredSuggestions([]);
    setShowInput(false); // Oculta o campo de input após adicionar a tag
  };

  // Remove uma tag ao clicar no botão de deletar
  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  // Mostra o input para adicionar mais tags
  const handleShowInput = () => {
    setShowInput(true);
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
            <button onClick={() => handleDeleteTag(tag)}>x</button>
          </div>
        ))}
        {/* {showInput && (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Adicionar nova tag"
            className={styles.input}
          />
        )} */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Adicionar nova tag"
          className={styles.input}
        />
        {!showInput && (
          <button className={styles.addTagBtn} onClick={handleShowInput}>
            + Adicionar tag
          </button>
        )}
      </div>

      {/* Lista de sugestões autocompletadas */}
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
