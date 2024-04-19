import { useState } from "react";
import CreateDir from "./createDir";
import GetFolders from "../components/getFolders";
import Header from "./header";

export default function Home() {
  const [folders, setFolders] = useState<string[]>([]);

  const handleFolderCreated = (newFolder: string) => {
    setFolders((prevFolders) => [...prevFolders, newFolder]);
  };

  return (
    <div className="container">
      <Header title="HOME CLOUD" />
      <CreateDir onFolderCreated={handleFolderCreated} />
      <hr />
      <GetFolders folders={folders} onFolderCreated={function (): void {
        throw new Error("Function not implemented.");
      } } />
      <hr />
    </div>
  );
}
