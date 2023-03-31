import React, { useState } from 'react';
import Image from 'next/image';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import Link from 'next/link';

export default function Home({ cvs, dirs }) {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedFile2, setSelectedFile2] = useState();
  const [selectedImage2, setSelectedImage2] = useState('');

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append('myImage', selectedFile);
      const { data } = await axios.post('/api/image', formData);
      console.log(data);
    } catch (error) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  const handleUpload2 = async () => {
    setUploading(true);
    try {
      if (!selectedFile2) return;
      const formData = new FormData();
      formData.append('myCv', selectedFile2);
      const { data } = await axios.post('/api/document', formData);
      console.log(data);
    } catch (error) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  return (
    <div className="w-full h-full">
      <div className="max-w-4xl mx-auto p-20 space-y-6 flex flex-col">
        <label>
          <input
            type="file"
            hidden
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files[0];

                setSelectedImage(URL.createObjectURL(file));
                setSelectedFile(file);
              }
            }}
          />
          <div className="w-40 aspect-video rounded flex items-center justify-around border-2 border-dashed cursor-pointer">
            {selectedImage ? (
              <Image src={selectedImage} alt="" width={500} height={500} />
            ) : (
              <span>Select Image</span>
            )}
          </div>
        </label>
        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{ opacity: uploading ? '.5' : '1' }}
          className="bg-blue-500 text-white p-3 w-32 text-center rounded"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <div className="mt-20 flex flex-col space-y-3">
          {dirs.map((item) => (
            <Link key={item} href={'/images/' + item}>
              {item}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-20 space-y-6 flex flex-col">
        <label>
          <input
            type="file"
            hidden
            onChange={({ target }) => {
              if (target.files) {
                const file2 = target.files[0];

                setSelectedImage2(URL.createObjectURL(file2));
                setSelectedFile2(file2);
              }
            }}
          />
          <div className="w-40 aspect-video rounded flex items-center justify-around border-2 border-dashed cursor-pointer">
            {selectedImage2 ? (
              <Image src={selectedImage2} alt="" width={500} height={500} />
            ) : (
              <span>Select CV</span>
            )}
          </div>
        </label>
        <button
          onClick={handleUpload2}
          disabled={uploading}
          style={{ opacity: uploading ? '.5' : '1' }}
          className="bg-blue-500 text-white p-3 w-32 text-center rounded"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <div className="mt-20 flex flex-col space-y-3">
          {cvs.map((item) => (
            <Link key={item} href={process.env.CV_DIR + item}>
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const props = { cvs: [], dirs: [] };
  try {
    const dirs = await fs.readdir(path.join(process.cwd(), 'public/images'));

    props.dirs = dirs;
    const cvs = await fs.readdir(process.env.CV_DIR);
    props.cvs = cvs;

    return { props };
  } catch (error) {
    console.log(error);
    return { props };
  }
};
