import React from 'react';

function JobPost(props) {
  return (
    <div
      className=" border-solid border-black border-2 w-[40vw] h-[40vh] m-4 rounded-lg p-3"
      key={props.id}
    >
      <h3>{props.title}</h3>
      <h3>{props.location}</h3>
      <h3>{props.contractType}</h3>
    </div>
  );
}

export default JobPost;
