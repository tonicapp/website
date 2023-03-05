import React from "react";
import SongForm from "./SongForm";

const UploadSongPage: React.FC = () => {
  const handleSubmit = (formData: FormData) => {
    console.log(formData);

    fetch("http://localhost:3333/api/uploadsong", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upload song");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Upload a Song</h1>
      <SongForm onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadSongPage;