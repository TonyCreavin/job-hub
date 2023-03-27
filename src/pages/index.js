import { Inter } from 'next/font/google';
import { useSession } from 'next-auth/react';

// import JobDetails from '@/components/JobDetails';
// import JobPost from '@/components/JobPosts';
// import prisma from '../../lib/prisma';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div className="w-full h-screen">
      <h1>HDM JOB FINDER</h1>
    </div>
  );
}
