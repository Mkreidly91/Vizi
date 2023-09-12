import React, { useState, useRef } from 'react';

function MultiFileUpload() {
  const [files, setFiles] = useState({});
  console.log(files);
  const [isOverlayDragged, setIsOverlayDragged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const addFiles = (selectedFiles) => {
    const newFiles = {};
    for (const file of selectedFiles) {
      const isImage = file.type.match('image.*');
      const objectURL = URL.createObjectURL(file);
      newFiles[objectURL] = file;
    }
    setFiles(newFiles);
  };

  const removeFile = (objectURL) => {
    const newFiles = { ...files };
    delete newFiles[objectURL];
    setFiles(newFiles);
  };

  const handleSubmit = () => {
    alert(`Submitted Files:\n${fileInputRef.current?.files}`);
    console.log(fileInputRef.current?.files);
    // alert(`Submitted Files:\n${JSON.stringify(Object.keys(files))}`);
    // console.log(Object.keys(files));
  };

  const handleCancel = () => {
    setFiles({});
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOverlayDragged(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOverlayDragged(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOverlayDragged(false);
    const selectedFiles = e.dataTransfer.files;
    addFiles(selectedFiles);
  };

  const handleInputChange = (e) => {
    const selectedFiles = e.target.files;
    addFiles(selectedFiles);
  };

  return (
    <main className="container max-w-screen-lg h-full">
      {/* file upload modal */}
      <article
        aria-label="File Upload Modal"
        className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnter={handleDragEnter}
      >
        {/* overlay
          <div
            id="overlay"
            className={`w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md ${
              isOverlayDragged ? 'draggedover' : ''
            }`}
          >
            <i>
              <svg
                className="fill-current w-12 h-12 mb-3 text-blue-700"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
              </svg>
            </i>
            <p className="text-lg text-blue-700">Drop files to upload</p>
          </div> */}

        {/* scroll area */}
        <section className="h-full overflow-auto p-8 w-full h-full flex flex-col">
          <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
            <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
              <span>Drag and drop your</span>&nbsp;
              <span>files anywhere or</span>
            </p>
            <input
              id="hidden-input"
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleInputChange}
            />
            <button
              id="button"
              className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload a file
            </button>
          </header>

          <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
            To Upload
          </h1>

          <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
            {Object.keys(files).length === 0 ? (
              <li
                id="empty"
                className="h-full w-full text-center flex flex-col items-center justify-center items-center"
              >
                <img
                  className="mx-auto w-32"
                  src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                  alt="no data"
                />
                <span className="text-small text-gray-500">
                  No files selected
                </span>
              </li>
            ) : (
              Object.keys(files).map((objectURL) => (
                <li
                  key={objectURL}
                  id={objectURL}
                  className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24"
                >
                  <article
                    tabIndex={0}
                    className={`group w-full h-full rounded-md focus:outline-none focus:shadow-outline relative bg-gray-100 cursor-pointer ${
                      files[objectURL].type.match('image.*') ? 'hasImage' : ''
                    }`}
                  >
                    {files[objectURL].type.match('image.*') && (
                      <img
                        alt="upload preview"
                        className="img-preview  w-full h-full sticky object-cover rounded-md bg-fixed"
                        src={objectURL}
                      />
                    )}

                    <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                      <h1 className="flex-1 group-hover:text-blue-800">
                        {files[objectURL].name}
                      </h1>
                      <div className="flex">
                        <span className="p-1 text-blue-800">
                          <i>
                            <svg
                              className="fill-current w-4 h-4 ml-auto pt-1"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                            </svg>
                          </i>
                        </span>
                        <p className="p-1 size text-xs text-gray-700">
                          {files[objectURL].size > 1024
                            ? files[objectURL].size > 1048576
                              ? Math.round(files[objectURL].size / 1048576) +
                                'mb'
                              : Math.round(files[objectURL].size / 1024) + 'kb'
                            : files[objectURL].size + 'b'}
                        </p>
                        <button
                          className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md text-gray-800"
                          onClick={() => removeFile(objectURL)}
                        >
                          <svg
                            className="pointer-events-none fill-current w-4 h-4 ml-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              className="pointer-events-none"
                              d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                            />
                          </svg>
                        </button>
                      </div>
                    </section>
                  </article>
                </li>
              ))
            )}
          </ul>
        </section>

        {/* sticky footer */}
        <footer className="flex justify-end px-8 pb-8 pt-4">
          <button
            id="submit"
            className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
            onClick={handleSubmit}
          >
            Upload now
          </button>
          <button
            id="cancel"
            className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </footer>
      </article>
    </main>
  );
}

export default MultiFileUpload;

// import React, { useState, useRef } from 'react';

// function MultiFileUpload() {
//   const [files, setFiles] = useState({});
//   console.log(files);
//   const [isOverlayDragged, setIsOverlayDragged] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const addFile = (file) => {
//     const isImage = file.type.match('image.*');
//     const objectURL = URL.createObjectURL(file);

//     const newFiles = { ...files };
//     newFiles[objectURL] = file;
//     setFiles(newFiles);
//   };

//   const removeFile = (objectURL) => {
//     const newFiles = { ...files };
//     delete newFiles[objectURL];
//     setFiles(newFiles);
//   };

//   const handleSubmit = () => {
//     alert(`Submitted Files:\n${JSON.stringify(files)}`);
//     console.log(files);
//   };

//   const handleCancel = () => {
//     setFiles({});
//   };

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsOverlayDragged(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsOverlayDragged(false);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsOverlayDragged(false);
//     for (const file of e.dataTransfer.files) {
//       addFile(file);
//     }
//   };

//   return (
//     <div className="bg-gray-500 h-screen w-screen sm:px-8 md:px-16 sm:py-8">
//       <main className="container mx-auto max-w-screen-lg h-full">
//         {/* file upload modal */}
//         <article
//           aria-label="File Upload Modal"
//           className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDragEnter={handleDragEnter}
//         >
//           {/* overlay */}
//           {/* <div
//             id="overlay"
//             className={`w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md ${
//               isOverlayDragged ? 'draggedover' : ''
//             }`}
//           >
//             <i>
//               <svg
//                 className="fill-current w-12 h-12 mb-3 text-blue-700"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
//               </svg>
//             </i>
//             <p className="text-lg text-blue-700">Drop files to upload</p>
//           </div> */}

//           {/* scroll area */}
//           <section className="h-full overflow-auto p-8 w-full h-full flex flex-col">
//             <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
//               <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
//                 <span>Drag and drop your</span>&nbsp;
//                 <span>files anywhere or</span>
//               </p>
//               <input
//                 id="hidden-input"
//                 ref={fileInputRef}
//                 type="file"
//                 multiple
//                 className="hidden"
//                 onChange={(e) => {
//                   for (const file of e.target.files) {
//                     addFile(file);
//                   }
//                 }}
//               />
//               <button
//                 id="button"
//                 className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
//                 // onClick={() => document.getElementById('hidden-input').click()}
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 Upload a file
//               </button>
//             </header>

//             <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
//               To Upload
//             </h1>

//             <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
//               {Object.keys(files).length === 0 ? (
//                 <li
//                   id="empty"
//                   className="h-full w-full text-center flex flex-col items-center justify-center items-center"
//                 >
//                   <img
//                     className="mx-auto w-32"
//                     src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
//                     alt="no data"
//                   />
//                   <span className="text-small text-gray-500">
//                     No files selected
//                   </span>
//                 </li>
//               ) : (
//                 Object.keys(files).map((objectURL) => (
//                   <li
//                     key={objectURL}
//                     id={objectURL}
//                     className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24"
//                   >
//                     <article
//                       tabIndex="0"
//                       className={`group w-full h-full rounded-md focus:outline-none focus:shadow-outline relative bg-gray-100 cursor-pointer ${
//                         files[objectURL].type.match('image.*') ? 'hasImage' : ''
//                       }`}
//                     >
//                       {files[objectURL].type.match('image.*') && (
//                         <img
//                           alt="upload preview"
//                           className="img-preview hidden w-full h-full sticky object-cover rounded-md bg-fixed"
//                           src={objectURL}
//                         />
//                       )}

//                       <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
//                         <h1 className="flex-1 group-hover:text-blue-800">
//                           {files[objectURL].name}
//                         </h1>
//                         <div className="flex">
//                           <span className="p-1 text-blue-800">
//                             <i>
//                               <svg
//                                 className="fill-current w-4 h-4 ml-auto pt-1"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
//                               </svg>
//                             </i>
//                           </span>
//                           <p className="p-1 size text-xs text-gray-700">
//                             {files[objectURL].size > 1024
//                               ? files[objectURL].size > 1048576
//                                 ? Math.round(files[objectURL].size / 1048576) +
//                                   'mb'
//                                 : Math.round(files[objectURL].size / 1024) +
//                                   'kb'
//                               : files[objectURL].size + 'b'}
//                           </p>
//                           <button
//                             className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md text-gray-800"
//                             onClick={() => removeFile(objectURL)}
//                           >
//                             <svg
//                               className="pointer-events-none fill-current w-4 h-4 ml-auto"
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="24"
//                               height="24"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 className="pointer-events-none"
//                                 d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
//                               />
//                             </svg>
//                           </button>
//                         </div>
//                       </section>
//                     </article>
//                   </li>
//                 ))
//               )}
//             </ul>
//           </section>

//           {/* sticky footer */}
//           <footer className="flex justify-end px-8 pb-8 pt-4">
//             <button
//               id="submit"
//               className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
//               onClick={handleSubmit}
//             >
//               Upload now
//             </button>
//             <button
//               id="cancel"
//               className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//           </footer>
//         </article>
//       </main>
//     </div>
//   );
// }

// export default MultiFileUpload;
