import React from 'react';

function JobDetails(props) {
  return (
    <div className="  w-[40vw] h-screen border-black border-2 m-4 border-solid rounded-lg mt-3 p-2">
      <h3>Post: {props.title}</h3>
      <h3>Location: {props.location}</h3>
      <h3>Contract: {props.contractType}</h3>
      <h3>Description:</h3>
      <h3>{props.description}</h3>
    </div>
  );
}

export default JobDetails;
