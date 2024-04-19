import { Link } from "react-router-dom";
import backIcon from "../assets/back.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetFiles from "./getFiles";
import Upload from "./upload";
import Header from "./header";
import FileManipulator from "./fileManipulator";


export default function FolderContent() {
  const { folderName } = useParams<{ folderName?: string }>();
  const [files, setFiles] = useState<string[]>([]);
  //const [folders, setFolders] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    if (folderName) {
      document.title = `${folderName} - HomeCloud`;
    }
  }, [folderName]);

  const handleFileUploaded = (fileName: string) => {
    if (!files.includes(fileName)) {
      setFiles((prevFiles) => [...prevFiles, fileName]);
    }
  };

  const handleFileSelected = (fileName: string) => {
    setSelectedFile(fileName);
  };

 

  return (
    <div className="container">
      <div className="d-flex align-items-center">
        <Link to="/" className="mr-3">
          <img src={backIcon} alt="BackIcon" />
        </Link>
        {folderName && <Header title={folderName} />}
      </div>
      <hr />
      {folderName && (
        <>
          <Upload folderName={folderName} onFileUploaded={handleFileUploaded} />
         
        </>
      )}
      <hr />
      <GetFiles files={files} onSelectFile={handleFileSelected} />
      <hr />
      {selectedFile && (
        <FileManipulator
          fileName={selectedFile}
          folderName={folderName || ""}
          onDelete={() => {}}
        />
      )}
    </div>
  );
}