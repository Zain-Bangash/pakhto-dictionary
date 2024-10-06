import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const App = () => {
//   const [words, setWords] = useState([]);
//   const [newWord, setNewWord] = useState({ term: '', definition: '', usage: '' });

//   useEffect(() => {
//     axios.get('http://localhost:3001/words').then((res) => setWords(res.data));
//   }, []);

//   const addWord = async () => {
//     try {
//       const response = await axios.post('http://localhost:3001/words/add', newWord);
//       setWords([...words, response.data]);
//     } catch (error) {
//       console.error(error);
//     }
//   };  

//   return (
//     <div>
//       <h1>Bangash Pashto Dictionary</h1>
//       <input
//         type="text"
//         placeholder="Term"
//         value={newWord.term}
//         onChange={(e) => setNewWord({ ...newWord, term: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Definition"
//         value={newWord.definition}
//         onChange={(e) => setNewWord({ ...newWord, definition: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Usage"
//         value={newWord.usage}
//         onChange={(e) => setNewWord({ ...newWord, usage: e.target.value })}
//       />
//       <button onClick={addWord}>Add Word</button>
//       <ul>
//         {words.map((word) => (
//           <li key={word._id}>
//             {word.term}: {word.definition}: {word.usage}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


import "./App.css";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
        axios.get('http://localhost:3001/api')
        .then((res) => setData(res.data.message))
        .catch((err) => console.error(err));
      }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
