import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState({ term: '', definition: '', usage: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/words?limit=10')
      .then((res) => {
        console.log("API Response:", res.data);
        if (Array.isArray(res.data)) {
          setWords(res.data);
        } else if (res.data) {
          setWords([res.data]); // Wrap single object in an array
        }
      })
      .catch((error) => {
        console.error("Error fetching words:", error);
        setWords([]); // Ensure it's always an array
      });
  }, []);

  const addWord = async () => {
    if (!newWord.term || !newWord.definition || !newWord.usage) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/words/add", newWord);
      
      // Success: Add new word to the list and clear the form
      setWords((prevWords) => [...prevWords, response.data]);
      setNewWord({ term: "", definition: "", usage: "" });
      alert("Word added successfully!");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 && error.response.data.error === "This word already exists in the dictionary!") {
          alert("This word already exists!");
        } else {
          alert("Something went wrong, please try again!");
        }
      } else {
        alert("Unable to connect to server.");
      }
    }
  };
  

  return (
    <div>
      <h1>Bangash Pashto Dictionary</h1>
      <input
        type="text"
        placeholder="Term"
        value={newWord.term}
        onChange={(e) => setNewWord({ ...newWord, term: e.target.value })}
      />
      <input
        type="text"
        placeholder="Definition"
        value={newWord.definition}
        onChange={(e) => setNewWord({ ...newWord, definition: e.target.value })}
      />
      <input
        type="text"
        placeholder="Usage"
        value={newWord.usage}
        onChange={(e) => setNewWord({ ...newWord, usage: e.target.value })}
      />
      <button onClick={addWord}>Add Word</button>
      
      <ul>
        {Array.isArray(words) ? (
          words.map((word) => (
            <li key={word._id}>
              {word.term} | {word.definition} | {word.usage}
            </li>
          ))
        ) : (
          <p>Loading words...</p>
        )}
      </ul>
    </div>
  );
};

export default App;
