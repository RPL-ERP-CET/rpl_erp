import Image from "next/image";

export type ExecutiveTeamMember = {
  name: string;
  designation: string;
  organizationAddress: string;
  contactNumber?: string[];
  image?: string;
};

export const boardOfDirectors: ExecutiveTeamMember[] = [
  {
    name: "Dr. K. Vasuki, IAS",
    designation:
      "Chairperson, RPL; Secretary to Government, Labour and Skills Department",
    organizationAddress: "Government Secretariat, Thiruvananthapuram, Kerala.",
  },
  {
    name: "Shri. Y. M. Shajikumar, IFS",
    designation: "Managing Director, Rehabilitation Plantations Limited",
    organizationAddress: "Punalur-691305",
    contactNumber: ["0475-2222910", "9447112971"],
  },
  {
    name: "Dr. Sanjayan Kumar, IFS",
    designation: "Chief Conservator of Forests (IT)",
    organizationAddress:
      "Forest Head Quarters, Vazhuthakkadu, Thiruvananthapuram, Kerala.",
  },
  {
    name: "Shri. Makkhan Lal Meeena",
    designation: "Joint Secretary, Ministry of Home Affairs (FFR Division)",
    organizationAddress:
      "2nd Floor, NDCC-II Building, Jai Singh Road, New Delhi.",
  },
  {
    name: "Dr. Anitha Thampi",
    designation: "Chairman and Managing Director, HLL Lifecare Limited",
    organizationAddress: "Poojappura, Thiruvananthapuram.",
  },
  {
    name: "Ms. Preetha B.",
    designation:
      "Additional Secretary to Government, Labour & Skills Department",
    organizationAddress: "Government Secretariat, Thiruvananthapuram.",
  },
  {
    name: "Shri. V. Sivaprasad",
    designation: "Under Secretary to Government, Finance Department",
    organizationAddress: "Government Secretariat, Thiruvananthapuram.",
  },
];

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

export default function ExecutiveTeam() {
  return (
    <section id="executive-team" className="bg-gray-50 py-16 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col justify-between gap-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Executive Team
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {boardOfDirectors.map((member) => (
            <ExecutiveTeamMember key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
