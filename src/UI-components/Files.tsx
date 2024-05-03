import React, { useState, useEffect } from "react";
import fileIcon from "../assets/icons/file.svg";

interface Props {
  onUpload: (jsonData: JsonData | null) => void;
}

interface JsonData {
  form_name: string;
  form_fields: FormField[];
  form_buttons: FormButton[];
  form_description: string;
}

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder: string;
  maxlength: number;
  minlength?: number;
  pattern?: string;
  formats?: string;
  max_size?: number;
  max_count: number;
}

interface FormButton {
  name: string;
  type: string;
}

const Files: React.FC<Props> = ({ onUpload }) => {
  const [activeDrag, setActiveDrag] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const [fileDetails, setFileDetails] = useState<{
    name: string;
    size: number;
  } | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      if (file.size > 10 * 10 * 1024) {
        setFileError("File size exceeds 10MB limit");
      } else {
        setFileError(null);
        setFileDetails({ name: file.name, size: file.size });
        if (file.type === "application/json") {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const formData = JSON.parse(e.target?.result as string);
              onUpload(formData);
            } catch (error) {
              console.error("Error parsing JSON file:", error);
            }
          };
          reader.readAsText(file);
        } else {
          onUploadImage(file);
        }
      }
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setActiveDrag(false);
    const fileList = event.dataTransfer.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      if (file.size > 10 * 1024 * 1024) {
        setFileError("File size exceeds 10MB limit");
      } else {
        setFileError(null);
        setFileDetails({ name: file.name, size: file.size });
        if (file.type === "application/json") {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const formData = JSON.parse(e.target?.result as string);
              onUpload(formData);
            } catch (error) {
              console.error("Error parsing JSON file:", error);
            }
          };
          reader.readAsText(file);
        } else {
          onUploadImage(file);
        }
      }
    }
  };

  const onUploadImage = (file: File) => {
    // Create a URL for the uploaded file
    const imageUrl = URL.createObjectURL(file);
    // Store the URL in the state
    setImagePreviewUrl(imageUrl);
    // Call the onUpload function with the file
    onUpload(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setActiveDrag(true);
  };

  const handleDeleteFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setFileDetails(null);
    onUpload(null);
    setImagePreviewUrl(null);
  };

  useEffect(() => {
    const dragLeaveHandler = () => {
      setActiveDrag(false);
    };

    document.addEventListener("dragleave", dragLeaveHandler);

    return () => {
      document.removeEventListener("dragleave", dragLeaveHandler);
    };
  }, []);

  return (
    <div
      className={`file-uploader p-5 mb-5 rounded-sm ${
        activeDrag ? "active-drag bg-primary flex justify-center" : "bg-white"
      }`}
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        id={fileDetails ? "" : "file-input"}
        accept=".json"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      {!activeDrag && (
        <label
          htmlFor="file-input"
          className="flex flex-col items-start gap-[8px] "
        >
          <div>
            {fileDetails ? (
              <div className="flex flex-col items-start gap-2">
                <p>
                  {fileDetails.name}{" "}
                  <span className="text-sm text-gray">
                    {(fileDetails.size / 1024).toFixed(2)} KB
                  </span>
                </p>
                <button
                  className="text-primary text-xs"
                  onClick={handleDeleteFile}
                >
                  Delete file
                </button>
              </div>
            ) : (
              <p>
                <span className="text-primary">Select a file</span> or drag in
                form
              </p>
            )}
          </div>
          {fileError ? (
            <p className="text-xs text-red">The file weight more than 10 MB</p>
          ) : (
            !fileDetails && (
              <p className="text-xs text-gray">
                PNG, jpg, gif files up to 10 MB in size are available for
                download
              </p>
            )
          )}
        </label>
      )}
      {activeDrag && <img src={fileIcon} className="items-center" />}
      {imagePreviewUrl && (
        <img
          src={imagePreviewUrl}
          alt="Uploaded"
          className="mt-3 w-16 rounded-sm"
        />
      )}
    </div>
  );
};

export default Files;
