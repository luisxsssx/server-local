import { useState, ChangeEvent } from "react";
import { endpoints } from "../api/api";

interface UploadProps {
  folderName?: string;
  onFileUploaded?: (fileName: string) => void;
  updateFilesList?: () => void; // Nuevo prop para actualizar la lista de archivos después de cargar un archivo
}

export default function Upload({
  folderName,
  onFileUploaded,
  updateFilesList,
}: UploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    let uploadUrl = endpoints.files.upload("");
    if (folderName) {
      uploadUrl = endpoints.files.upload(folderName);
    }

    fetch(uploadUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        if (onFileUploaded) {
          onFileUploaded(file.name);
        }
        if (updateFilesList) {
          updateFilesList(); // Llamar a la función para actualizar la lista de archivos
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <label className="form-label mt-2">Upload Files</label>
      <input
        className="form-control w-25"
        type="file"
        onChange={handleFileChange}
      />
      <button className="btn btn-primary mt-3" onClick={handleUpload}>
        Upload File
      </button>
    </div>
  );
}
