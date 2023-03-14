import UploadSongPage from "src/components/testing/UploadSongPage";
import AppLayout from "src/layouts/AppLayout";

export default function Testing() {
  // Tests the creation of a Candy Machine
  const createCMTest = async () => {
    fetch("http://localhost:3333/api/testcandymachine", {
      method: "POST",
      body: null,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to generate Candy Machine");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Tests a created Candy Machine
  const checkCMTest = async () => {
    fetch("http://localhost:3333/api/testLoadCM", {
      method: "POST",
      body: null,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to check Candy Machine");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AppLayout>
      <UploadSongPage />
      <button  onClick={createCMTest}>Create CM Test</button>
      <button  onClick={checkCMTest}>Check CM Test</button>
    </AppLayout>
  )
} 