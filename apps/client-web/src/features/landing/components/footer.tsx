"use client";

import { Building, LucideIcon, Mail, Phone } from "lucide-react";
import Link from "next/link";

type LinkItem = {
  text: string;
  href: string;
};

const ADDRESS = {
  addressLine1: "Rehabilitation Plantations Ltd",
  addressLine2: "Regd. Office",
  city: "Punalur",
  state: "Kerala",
  country: "India",
  zip: "691305",
};

const CONTACT_INFO = [
  {
    icon: Phone,
    text: "0475 – 2222971 / 2222972 / 2222973",
  },
  {
    icon: Mail,
    text: "mdrplpunalur@gmail.com, mdrpl@sancharnet.in",
  },
];
const QUICK_LINKS = [
  {
    text: "Careers",
    href: "#",
  },
  {
    text: "RTI",
    href: "#",
  },
  {
    text: "Tenders",
    href: "#",
  },
  {
    text: "GO's",
    href: "#",
  },
];

const PUBLICATIONS = [
  {
    text: "CSR Policy",
    href: "#",
  },
  {
    text: "Risk Management Policy",
    href: "#",
  },
  {
    text: "Downloads",
    href: "#",
  },
  {
    text: "Notification",
    href: "#",
  },
  {
    text: "Annual Report",
    href: "#",
  },
  {
    text: "Annual Report CSR",
    href: "#",
  },
  {
    text: "Articles of Association",
    href: "#",
  },
  {
    text: "Farm Tourism",
    href: "#",
  },
];

const DEPARTMENTS = [
  {
    text: "Sales",
    href: "#",
  },
  {
    text: "Purchase",
    href: "#",
  },
  {
    text: "Finance",
    href: "#",
  },
  {
    text: "Engineering wing",
    href: "#",
  },
  {
    text: "Personnel & Administration",
    href: "#",
  },
];

const LEGAL_LINKS = [
  { text: "Privacy Policy", href: "#" },
  { text: "Terms of Service", href: "#" },
];

function InfoItem({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex items-start justify-center space-x-2">
      <Icon className="h-4 w-4 shrink-0 text-emerald-800" />
      <span className="text-gray-600 text-sm">{text}</span>
    </div>
  );
}

function LinkList({ title, items }: { title: string; items: LinkItem[] }) {
  return (
    <div className="flex flex-col items-start space-y-6">
      <h3 className="text-lg font-bold text-emerald-800">{title}</h3>
      <nav className="flex flex-col items-start space-y-3">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="block text-gray-600 hover:text-emerald-800 hover:translate-x-1 transition-all duration-200 font-medium"
          >
            {item.text}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 - Contact Info */}
          <div className="flex flex-col items-start space-y-6">
            <div className="flex items-start space-x-2">
              <Building className="h-8 w-8 text-emerald-800" />
              <span className="text-lg font-bold text-emerald-800">
                Organization
              </span>
            </div>

            <div className="flex flex-col items-start space-y-4">
              <h3 className="text-lg font-bold text-emerald-800">
                Contact Information
              </h3>

              <div className="flex flex-col items-start space-y-2 text-gray-600">
                <p className="leading-relaxed">
                  {ADDRESS.addressLine1}
                  <br />
                  {ADDRESS.addressLine2}
                  <br />
                  {ADDRESS.city}, {ADDRESS.state} - {ADDRESS.zip}
                  <br />
                  {ADDRESS.country}
                </p>

                <div className="flex flex-col items-start pt-2 space-y-2">
                  {CONTACT_INFO.map((item) => (
                    <InfoItem
                      key={item.text}
                      icon={item.icon}
                      text={item.text}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Other Columns */}
          <LinkList title="Quick Links" items={QUICK_LINKS} />
          <LinkList title="Publications" items={PUBLICATIONS} />
          <LinkList title="Departments" items={DEPARTMENTS} />
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm">
              &copy;{new Date().getFullYear()} Rehabilitation Plantations Ltd.
              All rights reserved.
            </div>

            <div className="flex space-x-6">
              {LEGAL_LINKS.map(({ text, href }) => (
                <Link
                  key={text}
                  href={href}
                  className="text-gray-500 hover:text-emerald-800 text-sm transition-colors duration-200"
                >
                  {text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
