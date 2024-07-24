"use client"

import { useState } from 'react';

type GenerateFormProps = {
  onGenerate: (prompt: string) => void;
};

const GenerateForm: React.FC<GenerateFormProps> = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(prompt);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg text-gray-700">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="prompt">
            Prompt
          </label>
          <input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Generate Images
        </button>
      </form>
    </div>
  );
};

export default GenerateForm;
