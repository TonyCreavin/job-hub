import React from 'react';

function JobPost(props) {
  return (
    <div
      className=" border-solid overflow-scroll border-black border-2 w-[40vw] h-[40vh] m-4 rounded-lg p-3 bg-white"
      key={props.id}
    >
      <h3>Post: {props.title}</h3>
      <h3>Location: {props.location}</h3>
      <h3>Contract: {props.contractType}</h3>
      <h3>Description:</h3>
      <h3>{props.description}</h3>
    </div>
  );
}

export default JobPost;
