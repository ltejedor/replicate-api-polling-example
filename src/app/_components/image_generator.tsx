"use client"

import { useState } from 'react';
import GenerateForm from './generate_form';

interface Prediction {
    id: string;
    status: 'succeeded' | 'failed' | 'processing';
    output: string[];
}  

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ImageGenerator: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    let prediction: Prediction;
    try {
      prediction = await response.json() as Prediction;
    } catch (error) {
      setError('Failed to parse prediction response');
      setIsLoading(false);
      return;
    }

    while (prediction.status !== "succeeded" && prediction.status !== "failed") {
      await sleep(1000);
      const statusResponse = await fetch(`/api/predictions/${prediction.id}`);
      try {
        prediction = await statusResponse.json() as Prediction;
      } catch (error) {
        setError('Failed to parse status response');
        setIsLoading(false);
        return;
      }
      // Uncomment this line to view the Replicate API response in your console.
      // console.log({ prediction });
    }

    if (prediction.status === "succeeded" && Array.isArray(prediction.output)) {
      setImages(prediction.output);
    } else {
      setError('Prediction failed or output is not an array of strings');
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center text-gray-700 p-4 w-full">
      <GenerateForm onGenerate={handleSubmit} />
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Images</h3>
        <div className="grid grid-cols-2 gap-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            images.map((image, index) => (
              <img key={index} src={image} alt={`Generated image ${index + 1}`} className="w-full h-auto rounded-md shadow-md" />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
