import React, { useState, useEffect } from "react";

const fruits = ["apple", "banana", "cherry", "date", "elderberry", "fig"];

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState(fruits); // show all initially
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      if (!inputValue) {
        setSuggestions(fruits); // all fruits when input empty
      } else {
        const filtered = fruits.filter((fruit) =>
          fruit.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestions(filtered);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div className="w-64 mx-auto mt-10">
      <input
        type="text"
        value={inputValue}
        placeholder="Search fruits..."
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full border rounded p-2"
      />

      {loading && <p className="text-gray-500 text-sm mt-1">Loading...</p>}

      <ul className="border rounded mt-2 bg-white">
        {suggestions.map((fruit, idx) => (
          <li
            key={idx}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => setInputValue(fruit)}
          >
            {fruit}
          </li>
        ))}
      </ul>
    </div>
  );
}
