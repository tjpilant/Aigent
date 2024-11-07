import React, { useState } from 'react';

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      onFileUpload(files);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
          Google AI OCR Upload Files (max 15 pages)
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          multiple
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      {selectedFiles.length > 0 && (
        <p className="mt-2 text-sm text-gray-500">
          Selected files: {selectedFiles.map(file => file.name).join(', ')}
        </p>
      )}
      <p className="mt-2 text-xs text-gray-500">
        Note: File size is limited to 20MB for images and 2GB for PDFs.
      </p>
    </div>
  );
};

export default FileUpload;
