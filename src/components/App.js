import React, { useState, useEffect } from "react";

const fruits = ["apple", "banana", "cherry", "date", "elderberry", "fig"];

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulate async search with debounce
  useEffect(() => {
    if (!inputValue) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      // async filter simulation
      const filtered = fruits.filter((fruit) =>
        fruit.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filtered);
      setLoading(false);
    }, 300); // debounce delay

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
