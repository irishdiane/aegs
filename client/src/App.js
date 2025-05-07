import { useState, useEffect } from 'react';

function App() {
  const [setData] = useState([{}]);

  useEffect(() => {
    fetch('grading-form')
      .then(res => res.json())
      .then(data => {
        setData(data);
        console.log(data);
      })})
      .catch(error => {
        console.error("Failed to fetch grading form:", error);
     });
}

export default App;