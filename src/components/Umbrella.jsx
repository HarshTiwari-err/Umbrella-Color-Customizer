import { useState, useRef } from "react";
import { X } from "lucide-react";
import "./Umbrella.css";
import { colorsList } from "../data";
import loaderIcon from "../assets/loader_icon.svg";
import uploadIcon from "../assets/upload_icon.svg";
export const Umbrella = () => {
  const [umbrella, setUmbrella] = useState(colorsList[0]);
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const textColor = umbrella.textColor;
  const umbrellaImage = umbrella.filePath;
  const backgroundColor = umbrella.backgroundColor;

  const handleLogoUpload = (event) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); // Show loading for 1 second
    const file = event.target.files[0];
    if (file && file.type.match("image.*") && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedLogo(e.target.result);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a .png or .jpg file under 5MB.");
    }
  };

  const handleColorChange = (color) => {
    setLoading(true); // Start loading when color is selected

    // Simulate image loading with a slight delay for smooth transition
    setTimeout(() => {
      setUmbrella(color);
      setLoading(false); // Stop loading after image is "loaded"
    }, 1000); // Slow transition duration

  };

  return (
    <div
      className="umbrella-container"
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      <div className="umbrella-image-container">
        {loading ? (
          <img
            src={loaderIcon}
            alt="Loading"
            className="umbrella-loading-icon rotating"
          />
        ) : (
          <img src={umbrellaImage} alt="Umbrella" className="umbrella-img" />
        )}
        {uploadedLogo && !loading && (
          <img
            src={uploadedLogo}
            alt="Uploaded logo"
            className="uploaded-logo"
          />
        )}
      </div>
      <div className="umbrella-controls">
        <h1 className="title">Custom Umbrella</h1>
        <div className="color-options">
          {colorsList.map((color) => (
            <button
              key={color.id}
              onClick={() => handleColorChange(color)}
              className="color-button"
              style={{ backgroundColor: color.colour }}
              aria-label={`Select ${color.colour} umbrella`}
            />
          ))}
        </div>
        <p className="subtitle">Customize your umbrella</p>
        <p className="instructions">Upload a logo for an instant preview.</p>
        <p className="file-info">
          .png and .jpg files only. Max file size is 5MB.
        </p>
        <div className="file-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="file-input"
            ref={fileInputRef}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className={`upload-button ${fileName ? "file-selected" : ""}`}
          >
            {loading ? (
              <img
                src={loaderIcon}
                alt="Loading"
                className="loading-icon rotating"
              />
            ) : (
              <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
            )}
            <span className="upload-text">{fileName || "UPLOAD LOGO"}</span>
            {fileName && (
              <X
                size={20}
                className="clear-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadedLogo(null);
                  setFileName("");
                }}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Umbrella;
