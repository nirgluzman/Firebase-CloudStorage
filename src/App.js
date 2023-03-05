import { useEffect, useState } from "react";

import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import { v4 } from "uuid";

import "./App.css";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  // Reference to the folder where all files are stored
  const imageListRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload == null) return;

    // Reference to file we want to operate on
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    // Upload file to Cloud Storage
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload image</button>

      {imageList.map((url) => {
        return <img key={v4()} src={url} />;
      })}
    </div>
  );
}

export default App;
