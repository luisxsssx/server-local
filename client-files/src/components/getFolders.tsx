import { useEffect, useState } from "react";
import folderIcon from "../assets/folder.svg";
import deleteIcon from "../assets/delete.svg";
import { endpoints } from "../api/api";
import { useNavigate } from "react-router-dom";

interface GetFoldersProps {
  folders: string[];
  onFolderCreated: (newFolder: string) => void; // Nueva prop para manejar la creación de carpetas
}

export default function GetFolders({
  folders: initialFolders,
  //onFolderCreated, // Agregar la prop a los argumentos de la función
}: GetFoldersProps) {
  const [folders, setFolders] = useState<string[]>(initialFolders);
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);

  const fetchFolders = async () => {
    try {
      const response = await fetch(endpoints.files.getFolders);
      if (response.ok) {
        const data = await response.json();
        setFolders(data);
      } else {
        console.error("Error getting folders");
      }
    } catch (error) {
      console.error("Error when making request:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [initialFolders]);

  const navigate = useNavigate();

  const handleFolderClick = (folderName: string) => {
    console.log("Folder clicked:", folderName);
    navigate(`/folder/${encodeURIComponent(folderName)}`);
  };

  const handleDeleteFolder = async (folderName: string) => {
    try {
      const response = await fetch(endpoints.files.deleteDir(folderName), {
        method: "DELETE",
      });
      if (response.ok) {
        // Actualizar la lista de carpetas después de eliminar
        setFolders((prevFolders) =>
          prevFolders.filter((folder) => folder !== folderName)
        );
      } else {
        throw new Error("Failed to delete folder");
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  return (
    <div className="container-lg">
      <div>
        <h2 className="text-center">Folders</h2>
        {folders.map((folder, index) => (
          <div className="container text-center" key={index}>
            <button
              key={index}
              className="btn btn-primary btn-lg mt-4 w-50 text-start position-relative"
              onClick={() => handleFolderClick(folder)}
              onMouseEnter={() => setHoveredFolder(folder)}
              onMouseLeave={() => setHoveredFolder(null)}
            >
              <img src={folderIcon} alt="Folder Icon" />
              {folder}
              {hoveredFolder === folder && (
                <img
                  src={deleteIcon}
                  alt="Delete Icon"
                  className="position-absolute end-0 top-50 translate-middle-y"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que el evento de clic se propague al botón
                    handleDeleteFolder(folder);
                  }}
                />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
