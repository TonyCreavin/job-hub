import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Inter } from 'next/font/google';

import JobPost from '../components/JobPosts';
import { PrismaClient } from '@prisma/client';
import PlaceSearchbar from '../components/PlaceSearchbar';
import JobSearchbar from '../components/JobSearchbar';

const prisma = new PrismaClient();

const inter = Inter({ subsets: ['latin'] });

export default function Offers({ offers }) {
  const [filterData, setFilterData] = useState([]);
  const [filterJob, setFilterJob] = useState([]);
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    const response = await axios.get('/api/category');
    const data = await response.data;
    setCategory(data);
  };
  useEffect(() => {
    getCategory();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    const filtered = offers.filter((offer) => offer.categoryId === value);
    setFilterData(filtered);
  };

  return (
    <>
      <div className="flex flex-col items-center  md:flex-row w-full  justify-around my-5 border-b border-solid border-gray-500  ">
        <JobSearchbar offers={offers} setFilterJob={setFilterJob} />
        <PlaceSearchbar offers={offers} setFilterData={setFilterData} />
      </div>
      <select
        onChange={handleChange}
        name="categoryId"
        id="categoryId"
        className="border-solid border-gray-300 border-[1px] h-[5vh] w-[90vw] rounded-md mb-5 mx-3"
      >
        <option className="text-center">Sélectionnez une catégorie</option>
        {category.map((category) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <div className=" w-full h-full">
        {filterData.length !== 0 && (
          <div className="flex flex-wrap w-full h-full">
            {filterData.map((offer) => (
              <JobPost key={offer.id} offer={offer} />
            ))}
          </div>
        )}
        {filterJob.length !== 0 && (
          <div className="flex flex-wrap w-full h-full">
            {filterJob.map((offer) => (
              <JobPost key={offer.id} offer={offer} />
            ))}
          </div>
        )}
        {filterData.length === 0 && filterJob.length === 0 && (
          <div className="flex flex-wrap w-full h-full">
            {offers.map((offer) => (
              <JobPost key={offer.id} offer={offer} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const offers = await prisma.offer.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return {
    props: {
      offers: JSON.parse(JSON.stringify(offers)),
    },
  };
}
