import React, { useState } from 'react';
import axios from 'axios';
import ImageUploading from "react-images-uploading";


function App() {
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (event) => {
  //   console.log(event.target.files);
  //   setSelectedFile(event.target.files);
  // };

  const handleUpload = () => {
    if (!images.length) {
      alert("Vui lòng chọn ảnh")
      return
    }
    if (images.length && images.length < 2) {
      const formData = new FormData();
      formData.append('file', images[0].file);

      axios.post('http://localhost:8000/upload', formData, {
        headers: {
          "Content-Type": 'multipart/form-data',
        },
      })
        .then((response) => {
          console.log('File uploaded successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    } else if (images.length > 1) {
      const formData = new FormData();

      for (let i = 0; i < images.length; i++) {
        formData.append('files', images[i].file);
      }

      axios.post('http://localhost:8000/upload-multiple', formData, {
        headers: {
          "Content-Type": 'multipart/form-data',
        },
      })
        .then((response) => {
          console.log('File uploaded successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  };


  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg", "png", "jpeg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default App;
