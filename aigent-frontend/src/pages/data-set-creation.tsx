import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FileUpload } from '../components/FileUpload';
import ErrorMessage from '../components/ErrorMessage';

const DataSetCreation: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/process-dataset', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process dataset');
      }

      setResult(`Dataset created successfully: ${file.name}`);
      setError(null);
    } catch (err) {
      console.error('Error creating dataset:', err);
      setError(err instanceof Error ? err.message : 'Failed to create dataset');
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Data Set Creation</h1>
        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} />
          </div>
        )}
        <div className="space-y-6">
          <FileUpload onFileUpload={handleFileUpload} />
          {result && (
            <div className="mt-4 p-4 bg-green-100 rounded-md">
              <p className="text-green-700">{result}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DataSetCreation;
