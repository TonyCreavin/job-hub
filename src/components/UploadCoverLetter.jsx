import axios from 'axios';
import React from 'react';
import LanguageContext from '../LanguageContext';
import { useContext } from 'react';
import TipTap from './Tiptap';

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
        <div className="flex flex-col">
          <TipTap
            name="coverLetter"
            id="coverLetter"
            // className="w-[80vw] h-[80vh] border-solid border-gray-200 border-2  rounded-lg p-3  bg-white"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            setContent={(content) => setCoverLetter(content)}
          />
        </div>
      </div>
    </>
  );
}
