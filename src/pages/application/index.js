import React from 'react';
import ApplicantsCard from '@/components/ApplicantsCard';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function AllApplicants({ applications }) {
  return (
    <div>
      {applications.map((applicant) => {
        return (
          <ApplicantsCard
            key={applicant.id}
            userId={applicant.userId}
            offerId={applicant.offerId}
            cv={applicant.cv}
            coverLetter={applicant.coverLetter}
          />
        );
      })}
    </div>
  );
}
export async function getServerSideProps(context) {
  const applications = await prisma.application.findMany({});
  return {
    props: {
      applications: JSON.parse(JSON.stringify(applications)),
    },
  };
}
