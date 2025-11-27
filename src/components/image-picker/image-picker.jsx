"use client";
import React from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
const ImagePicker = ({ label, name }) => {
  const inputRef = React.useRef();
  const [image, setImage] = React.useState(null);
  const pickImageHandler = () => {
    inputRef.current.click();
  };
  const inputChangeHandler = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log(fileReader.result);
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!image && <p>no image picked yet</p>}
          {image && <Image src={image} alt="preview" fill />}
        </div>
        <input
          className={classes.input}
          ref={inputRef}
          onChange={inputChangeHandler}
          type="file"
          id={name}
          name={name}
        />
        <button
          type="button"
          className={classes.button}
          onClick={pickImageHandler}
        >
          pick image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
