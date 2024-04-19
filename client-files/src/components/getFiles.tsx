import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endpoints } from "../api/api";
import FileManipulator from "./fileManipulator";

interface GetFilesProps {
  files: string[];
  onSelectFile: (fileName: string) => void;
}

export default function GetFiles({ files }: GetFilesProps) {
  const { folderName } = useParams<{ folderName?: string }>();
  const [fileList, setFileList] = useState<string[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      if (folderName) {
        try {
          const response = await fetch(endpoints.files.getFiles(folderName));
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              setFileList(data);
            } else {
              console.error("Error: Data is not an array of strings");
            }
          } else {
            console.error("Error fetching files:", response.statusText);
          }
        } catch (error) {
          console.error("Error when making request:", error);
        }
      }
    };

    fetchFiles();
  }, [folderName]); // Include folderName in the dependency array

  const handleDeleteFile = async (fileName: string) => {
    try {
      if (!folderName) {
        console.error("Folder name is undefined");
        return;
      }

      const response = await fetch(
        endpoints.files.delete(fileName, folderName),
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Eliminar el archivo de la lista local
        setFileList((prevFileList) =>
          prevFileList.filter((file) => file !== fileName)
        );
        console.log("File deleted successfully");
      } else {
        console.error("Error deleting file:", response.statusText);
      }
    } catch (error) {
      console.error("Error when making request:", error);
    }
  };

  return (
    <div className="container-lg">
      {folderName && (
        <div className="text-center d-flex align-items-center justify-content-center flex-column">
          <h1>Content</h1>
          <ul className="list-group mt-2 w-50 text-center">
            {/* Render all files */}
            {[...new Set([...files, ...fileList])].map((fileName, index) => (
              <li
                key={index}
                className="list-group-item mt-2 d-flex justify-content-between align-items-center position-relative"
              >
                {fileName}
                {/* Agrega el componente FileManipulator dentro del <li> */}
                <FileManipulator
                  fileName={fileName}
                  folderName={folderName || ""}
                  onDelete={() => handleDeleteFile(fileName)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
