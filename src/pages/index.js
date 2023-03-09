import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import JobDetails from '@/components/JobDetails';
import JobPost from '@/components/JobPosts';
import prisma from '../../lib/prisma';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ offers }) {
  return (
    <>
      <Navbar />

      <div className="flex w-full justify-around my-5">
        <input className="w-[40vw] h-8 border-2 border-black border-solid rounded-md p-2 mr-2" />
        <input className="w-[40vw] h-8 border-2 border-black border-solid rounded-md p-2 mr-2" />
        <button className="bg-[rgb(50,140,234)] text-white rounded-md py-1 px-2">
          Search
        </button>
      </div>
      <div className="flex flex-row justify-around">
        <div className="flex flex-col">
          {offers.map((offer) => (
            <JobPost
              key={offer.id}
              title={offer.title}
              location={offer.location}
              contractType={offer.contractType}
            />
          ))}
        </div>
        <JobDetails />
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
