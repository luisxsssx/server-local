import downloadIcon from "../assets/download.svg";
import deleteIcon from "../assets/delete.svg";
import "../css/main.css";
import { endpoints } from "../api/api";

interface FileManipulatorProps {
  onDelete: () => void;
  fileName: string;
  folderName: string; // Añade folderName como una prop
}

export default function FileManipulator({
  onDelete,
  fileName,
  folderName, // Añade folderName aquí
}: FileManipulatorProps) {
  const handleDownload = async () => {
    try {
      const downloadUrl = endpoints.files.download(folderName || "", fileName);
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="image-group">
      <img
        src={downloadIcon}
        alt="DownloadIcon"
        className="hover-icon"
        onClick={handleDownload}
      />

      <img
        src={deleteIcon}
        alt="DeleteIcon"
        className="hover-icon"
        onClick={onDelete}
      />
    </div>
  );
}
