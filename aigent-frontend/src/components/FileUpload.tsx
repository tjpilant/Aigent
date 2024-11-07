import React from "react";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        File
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-1 block w-full"
          accept=".tiff,.tif,.pdf,.png,.jpg,.jpeg"
        />
      </label>
    </div>
  );
};
