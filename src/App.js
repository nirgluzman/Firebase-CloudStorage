import { useState } from "react";

import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";

import { v4 } from "uuid";

import "./App.css";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const uploadImage = () => {
    if (imageUpload == null) return;

    // Create a reference to file we want to operate on
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    // Upload file to Cloud Storage
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image uploaded!");
    });
  };

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload image</button>
    </div>
  );
}

export default App;
