import React, { useState } from "react";
import { uploadFiles } from "../API";

const UploadForm = () => {
  const [firstSelectedFile, setFirstSelectedFile] = useState(null);
  const [secondSelectedFile, setSecondSelectedFile] = useState(null);
  const [load, setLoad] = useState(false);
  const [filesContent, setFilesContent] = useState({});
  const [comparsionFiles, setComparsionFiles] = useState([]);

  const onFileUpload = async () => {
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

      setComparsionFiles(data);
      setFilesContent(files);

      displayComparsion();
      setLoad(true);
    }, 10);
  };

  const displayComparsion = () => {
    let span = null;
    const display = document.getElementById("display");
    const fragment = document.createDocumentFragment();
    display.textContent = "";

    comparsionFiles.forEach((part) => {
      const color = part.added ? "green" : part.removed ? "red" : "grey";
      span = document.createElement("span");
      span.style.color = color;
      span.appendChild(
        document.createTextNode(
          part.added || part.removed ? part.value + "[4]" : part.value // Поменять на реальное значение
        )
      );
      fragment.appendChild(span);
    });
    display.appendChild(fragment);
  };

  return (
    <>
      <div>
        <h3>Первый файл</h3>
        <input
          type="file"
          accept=".txt" //.doc, .docx, .pdf пока что не поддерживаются
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

      {load && (
        <>
          <h3>Содержимое первого файла</h3> {filesContent.file1}{" "}
        </>
      )}
      {load && (
        <>
          <h3>Содержимое второго файла</h3> {filesContent.file2}{" "}
        </>
      )}
      {load && <h3>Разница</h3>}
      <span id="display"></span>
    </>
  );
};

export default UploadForm;
