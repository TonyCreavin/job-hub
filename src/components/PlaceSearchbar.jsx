import React from 'react';
import LanguageContext from '../LanguageContext';
import { useContext } from 'react';

export default function PlaceSearchbar({ offers, setFilterData }) {
  const { language } = useContext(LanguageContext);
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = offers.filter((value) => {
      return value.location.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === '') {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
    const clearInput = () => {
      setFilterData([]);
    };
  };
  return (
    <div>
      <input
        type="text"
        className="w-[90vw] mb-4 md:w-[40vw] h-8 border-solid border-gray-200 border-2  rounded-md p-2 mr-2"
        placeholder={!language ? 'cherchez une ville...' : 'search a city...'}
        id="jobsearch"
        onChange={handleFilter}
      />
    </div>
  );
}
