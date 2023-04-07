import axios from 'axios';
import React from 'react';

export default function UploadCoverLetter({
  handleApplication,
  coverLetter,
  setCoverLetter,
}) {
  return (
    <>
      <div className="flex flex-col items-center">
        <h3 className="text-center">Write a cover letter</h3>
        <form onSubmit={handleApplication}>
          <textarea
            name="coverLetter"
            id="coverLetter"
            cols="30"
            rows="10"
            className="border-2 border-gray-300 rounded-md w-3/4 h-full mb-6"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          ></textarea>

          <button
            type="submit"
            className="bg-blue-500 rounded-md text-white w-1/4 h-7 align-middle items-center justify-center mx-auto mb-6"
            onClick={handleApplication}
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
}
