import React, { useState } from "react";
import { uploadFiles } from "../API";

const UploadForm = () => {
  const [firstSelectedFile, setFirstSelectedFile] = useState(null);
  const [secondSelectedFile, setSecondSelectedFile] = useState(null);
  const [filesContent, setFilesContent] = useState(null);

  const onFileUpload = async () => {
    setFilesContent(null);
    const files = {};
    const reader = new FileReader();

    reader.readAsText(firstSelectedFile);
    reader.onload = () => {
      files.file1 = reader.result;
      reader.readAsText(secondSelectedFile);
      reader.onload = () => {
        files.file2 = reader.result;
      };
    };

    setTimeout(async () => {
      const data = await uploadFiles(files);
      setFilesContent(data);
    }, 10);
  };

  return (
    <div>
      <div>
        <h3>Первый файл</h3>
        <input
          type="file"
          accept=".doc, .docx, .pdf, .txt"
          onChange={(e) => setFirstSelectedFile(e.target.files[0])}
        />
        <h3>Второй файл</h3>
        <input
          type="file"
          accept=".txt" //.doc, .docx, .pdf пока что не поддерживаются
          onChange={(e) => setSecondSelectedFile(e.target.files[0])}
        />
        <button
          onClick={() => onFileUpload()}
          disabled={!firstSelectedFile || !secondSelectedFile}
        >
          Оценить разницу
        </button>
      </div>

      {filesContent && (
        <>
          <h3>Содержимое первого файла</h3> {filesContent.file1}{" "}
        </>
      )}
      {filesContent && (
        <>
          <h3>Содержимое второго файла</h3> {filesContent.file2}{" "}
        </>
      )}
    </div>
  );
};

export default UploadForm;
