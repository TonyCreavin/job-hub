import { Inter } from 'next/font/google';
import JobDetails from '@/components/JobDetails';
import JobPost from '@/components/JobPosts';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const inter = Inter({ subsets: ['latin'] });

export default function Offers({ offers }) {
  return (
    <>
      <div className="flex w-full justify-around my-5 border-b border-solid border-gray-500 pb-5">
        <input
          className="w-[40vw] h-8 shadow-lg rounded-md p-2 mr-2"
          placeholder="Type of job.."
        />
        <input
          className="w-[40vw] h-8 shadow-lg rounded-md p-2 mr-2"
          placeholder="location.."
        />
        <button className="bg-[rgb(50,140,234)] text-white rounded-md py-1 px-2">
          Search
        </button>
      </div>
      <div className="flex flex-row justify-around ">
        <div className="flex flex-col flex-1">
          {offers.map((offer) => (
            <JobPost key={offer.id} offer={offer} />
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
