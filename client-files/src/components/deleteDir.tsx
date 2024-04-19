import { useState } from "react";
import deleteIcon from "../assets/delete.svg";

export default function DeleteDir() {
  const [hovered, setHovered] = useState(false);

  const handleDeleteClick = () => {
    const dirToDelete = prompt("Enter directory name to delete:");
    if (dirToDelete) {
      fetch(`/deleteDir?dir=${dirToDelete}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error("Failed to delete directory");
          }
        })
        .then((data) => {
          alert(data);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="image-group">
      <img
        src={deleteIcon}
        alt="DeleteIcon"
        className={`hover-icon ${hovered ? "hovered" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleDeleteClick}
      />
    </div>
  );
}
