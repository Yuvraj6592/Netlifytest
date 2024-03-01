import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
const imageStyle = {
  width: "10%",
  cursor: "",
};
const Filedropzone = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
  });

  const handleDelete = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  function truncate(str, maxlength) {
    return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
  }
  return (
    <div style={{ padding: "0.7rem" }}>
      <div
        style={{
          display: "flex",
          cursor: "crosshair",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "50%",
          flexDirection: "column",
          borderRadius: "5px",
        }}
      >
        <div
          {...getRootProps()}
          style={{
            display: "flex",
            // overflow: "auto",
            width: "100%",
            height: "50%",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <CloudUploadOutlinedIcon sx={{ fontSize: "6rem" }} /> */}
          <img style={imageStyle} src="/images/photo.png" />
          <small>Files Supported: PDF, TEXT, DOC, DOCX, PNG, JPEG, JPG</small>
          <input {...getInputProps()} />
          <p>
            Drag and drop files here or click{" "}
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "blue",
              }}
            >
              Browse.
            </span>
          </p>
        </div>
      </div>
      {uploadedFiles.length > 0 && (
        <div
          style={{
            height: "8rem",
            cursor: "no-drop",
            width: "100%",
            overflow: "auto",
            display: "flex",
            justifyContent: "between",
            flexDirection: "column",
          }}
        >
          {uploadedFiles.map((file, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  padding: "10px",
                  backgroundColor: "#F5F5F7",
                  borderRadius: "5px",
                  padding: "0",
                  margin: "0",
                  // marginBottom: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AttachFileOutlinedIcon fontSize="16" />
                  <p style={{ paddingLeft: "10px" }}>
                    {/* {file.name} */}
                    {truncate(file.name, 50)}
                  </p>
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    paddingRight: "10px",
                  }}
                  onClick={handleDelete}
                >
                  <ClearIcon fontSize="1" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Filedropzone;
