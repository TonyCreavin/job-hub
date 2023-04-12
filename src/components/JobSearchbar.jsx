import React from 'react';

export default function JobSearchbar({ offers, setFilterJob }) {
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = offers.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === '') {
      setFilterJob([]);
    } else {
      setFilterJob(newFilter);
    }
    const clearInput = () => {
      setFilterJob([]);
    };
  };
  return (
    <div>
      <input
        type="text"
        className=" w-[90vw] mb-4 md:w-[40vw] h-8 border-solid border-gray-200 border-2  rounded-md p-2 mr-2"
        placeholder="search a job..."
        id="jobsearch"
        onChange={handleFilter}
      />
    </div>
  );
}