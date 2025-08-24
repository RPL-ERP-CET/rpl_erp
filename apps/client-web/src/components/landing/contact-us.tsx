import { Mail, Phone, type LucideIcon } from "lucide-react";
import Link from "next/link";

const CONTACT_INFO_PHONE = [
    {
        icon: Phone,
        text: "0475 – 2222971",
        href: "tel:04752222971",
    },
    { icon: Phone, text: "0475 – 2222972", href: "tel:04752222972" },
    { icon: Phone, text: "0475 – 2222973", href: "tel:04752222973" },
];

const CONTACT_INFO_EMAIL = [
    {
        icon: Mail,
        text: "mdrplpunalur@gmail.com",
        href: "mailto:mdrplpunalur@gmail.com",
    },
    {
        icon: Mail,
        text: "mdrpl@sancharnet.in",
        href: "mailto:mdrpl@sancharnet.in",
    },
];

function ContactInfoItem({
    icon: Icon,
    text,
    href,
}: {
    icon: LucideIcon;
    text: string;
    href?: string;
}) {
    const content = (
        <div className="flex items-center space-x-3">
            <Icon className="h-5 w-5 shrink-0 text-emerald-700" />
            <span className="text-gray-700 text-base">{text}</span>
        </div>
    );

    return href ? (
        <Link
            href={href}
            className="hover:text-emerald-700 transition-colors"
            target={href.startsWith("http") ? "_blank" : undefined}
        >
            {content}
        </Link>
    ) : (
        content
    );
}

export default function ContactUs() {
    return (
        <section id="contact-us" className="">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 py-8 px-6 text-center bg-emerald-800 border rounded-xl">
                {/* Heading */}
                <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                        Contact Us
                    </h1>
                    <p className="max-w-2xl mx-auto text-white">
                        Have questions or need assistance? Reach out to us via
                        phone or email, we’d love to hear from you.
                    </p>
                </div>

                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl text-left">
                    {CONTACT_INFO_PHONE.map((item) => (
                        <div
                            key={item.text}
                            className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                        >
                            <ContactInfoItem
                                icon={item.icon}
                                text={item.text}
                                href={item.href}
                            />
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl text-left">
                    {CONTACT_INFO_EMAIL.map((item) => (
                        <div
                            key={item.text}
                            className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                        >
                            <ContactInfoItem
                                icon={item.icon}
                                text={item.text}
                                href={item.href}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
