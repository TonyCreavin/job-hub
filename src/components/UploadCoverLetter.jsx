import axios from 'axios';
import React from 'react';
import LanguageContext from '../LanguageContext';
import { useContext } from 'react';

export default function UploadCoverLetter({
  handleApplication,
  coverLetter,
  setCoverLetter,
}) {
  const { language } = useContext(LanguageContext);
  return (
    <>
      <div className="flex flex-col items-center">
        <h3 className="text-center font-serif">
          {!language
            ? 'Ecrivez une lettre de motivation'
            : 'Write a coverletter'}
        </h3>
        <form onSubmit={handleApplication} className="flex flex-col">
          <textarea
            name="coverLetter"
            id="coverLetter"
            cols="30"
            rows="10"
            className="w-[80vw] h-[80vh] border-solid border-gray-200 border-2  rounded-lg p-3  bg-white"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          ></textarea>

          {/* <button
            type="submit"
            className="bg-blue-500 rounded-md text-white w-32 h-7   mx-auto my-6"
            onClick={handleApplication}
          >
            Apply
          </button> */}
        </form>
      </div>
    </>
  );
}
