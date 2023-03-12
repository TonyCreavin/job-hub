import React from 'react';
import { useRouter } from 'next/router';

function JobDetailsPage(props) {
  const router = useRouter();
  const { offer } = props;

  return (
    <div className="  w-[80vw] h-screen border-black border-2 m-4 border-solid rounded-lg mt-3 p-2 overflow-scroll">
      <h3>Post: {props.title}</h3>
      <h3>Location: {props.location}</h3>
      <h3>Contract: {props.contractType}</h3>
      <h3>Description:</h3>
      <h3>{props.description}</h3>
    </div>
  );
}

export default JobDetailsPage;
