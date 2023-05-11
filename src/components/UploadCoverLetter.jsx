import React, { useContext } from 'react';
import LanguageContext from '../LanguageContext';
import TipTap from './Tiptap';

export default function UploadCoverLetter({ coverLetter, setCoverLetter }) {
  const { language } = useContext(LanguageContext);
  return (
    <>
      <div className="flex flex-col items-center  ">
        <h3 className="text-center font-serif">
          {!language
            ? 'Ecrivez une lettre de motivation'
            : 'Write a coverletter'}
        </h3>
        <div className="flex flex-col w-3/4 md:w-1/2">
          <TipTap
            name="coverLetter"
            id="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            setContent={(content) => setCoverLetter(content)}
          />
        </div>
      </div>
    </>
  );
}
