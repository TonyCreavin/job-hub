import React from 'react';

export default function uploadcv() {
  return (
    <>
      <div className="sm:flex sm:flex-col sm:justify-center sm:align-middle sm:items-center w-[60%] h-[80%] border-gray-500 border-solid border-2 mt-5 mx-auto">
        <div className="flex flex-col md:flex-row justify-around align-middle items-center ">
          <div className="flex flex-col">
            <div className="my-40">upload CV</div>
            <input
              type="file"
              className=" bg-gray-400 rounded-md mb-10  w-1/2"
            />
          </div>
          <div className="flex flex-col">
            <div className="my-40">upload Coverletter</div>
            <input
              type="file"
              className=" bg-gray-400 rounded-md mb-10  w-1/2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 rounded-md text-white w-1/4 h-7 align-middle items-center justify-center mx-auto"
        >
          Upload
        </button>
      </div>
    </>
  );
}
