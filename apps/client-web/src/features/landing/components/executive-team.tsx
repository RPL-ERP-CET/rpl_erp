import Image from "next/image";
import { Suspense, use } from "react";
import { EXECUTIVE_TEAM_MEMBERS } from "../mocks";
import { Shimmer } from "@client-web/components";

export type ExecutiveTeamMember = {
  name: string;
  designation: string;
  organizationAddress: string;
  contactNumber?: string[];
  image?: string;
};

type ExecutiveTeamProps = {
  executiveTeamPromise?: Promise<{ data: ExecutiveTeamMember[] }>;
};

export default function ExecutiveTeamContainer() {
  const executiveTeamPromise = fetch("/cms/landing/executive-team")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch executive team");
      }
      return res.json();
    })
    .catch(() => {
      return { data: EXECUTIVE_TEAM_MEMBERS };
    });
  return (
    <Suspense fallback={<ExecutiveTeam />}>
      <ExecutiveTeam executiveTeamPromise={executiveTeamPromise} />
    </Suspense>
  );
}

function ExecutiveTeam({ executiveTeamPromise }: ExecutiveTeamProps) {
  const shouldUseSkeleton = executiveTeamPromise === undefined;
  const executiveTeam = shouldUseSkeleton
    ? Array(3).fill(null)
    : use(executiveTeamPromise).data;

  return (
    <section id="executive-team" className="py-16 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col justify-between gap-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Executive Team
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {executiveTeam.map((member: ExecutiveTeamMember, index: number) =>
            shouldUseSkeleton ? (
              <ExecutiveTeamMemberSkeleton key={index} />
            ) : (
              <ExecutiveTeamMember member={member} key={index} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function ExecutiveTeamMember({ member }: { member: ExecutiveTeamMember }) {
  return (
    <div className="flex flex-col justify-start items-center">
      <div className="flex flex-col items-center justify-center">
        {member.image && (
          <Image
            src={member.image}
            alt={member.name}
            className="w-32 h-32 rounded-full"
          />
        )}
        <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          {member.name}
        </h3>
        <p className="text-gray-500 text-sm">{member.designation}</p>
      </div>
      <div className="mt-4 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-sm">{member.organizationAddress}</p>
        {member.contactNumber && (
          <p className="flex gap-2 text-gray-500 text-sm">
            {member.contactNumber.map((number) => (
              <a
                key={number}
                href={`tel:${number}`}
                className="text-blue-500 hover:text-blue-600"
              >
                {number}
              </a>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}

function ExecutiveTeamMemberSkeleton() {
  return (
    <div className="flex flex-col justify-start items-center">
      {/* Avatar */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-gray-200 relative overflow-hidden">
          <Shimmer />
        </div>

        {/* Name */}
        <div className="mt-3 h-6 w-40 bg-gray-200 rounded relative overflow-hidden">
          <Shimmer />
        </div>

        {/* Designation */}
        <div className="mt-2 h-4 w-28 bg-gray-200 rounded relative overflow-hidden">
          <Shimmer />
        </div>
      </div>

      {/* Address + Contact */}
      <div className="mt-4 flex flex-col items-center justify-center space-y-2">
        <div className="h-4 w-56 bg-gray-200 rounded relative overflow-hidden">
          <Shimmer />
        </div>
        <div className="h-4 w-36 bg-gray-200 rounded relative overflow-hidden">
          <Shimmer />
        </div>
      </div>
    </div>
  );
}
