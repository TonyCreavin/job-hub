import { Inter } from 'next/font/google';

import JobPost from '@/components/JobPosts';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const inter = Inter({ subsets: ['latin'] });

export default function Offers({ offers }) {
  return (
    <>
      <div className="flex w-full h-screen justify-around my-5 border-b border-solid border-gray-500 pb-5 w">
        <input
          className="w-[40vw] h-8 shadow-lg rounded-md p-2 mr-2"
          placeholder="Type of job.."
        />
        <input
          className="w-[40vw] h-8 shadow-lg rounded-md p-2 mr-2"
          placeholder="location.."
        />
        <button className="bg-[rgb(50,140,234)] h-8 text-white rounded-md py-1 px-2">
          Search
        </button>
      </div>

      <div className="flex flex-wrap">
        {offers.map((offer) => (
          <JobPost key={offer.id} offer={offer} />
        ))}
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
