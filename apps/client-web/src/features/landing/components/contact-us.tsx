import { Mail, Phone, type LucideIcon } from "lucide-react";
import { Suspense, use } from "react";
import Link from "next/link";
import { CONTACT_INFO } from "@client-web/features/landing/mocks";
import { Shimmer } from "@client-web/components";

type ContactInfoGridProps = {
    contactInfoPromise?: Promise<{
        data: {
            phone: string[];
            email: string[];
        };
    }>;
};

export default function ContactUs() {
    const contactInfoPromise = fetch("/cms/landing/contact-us")
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch contact info");
            }
            return res.json();
        })
        .catch(() => {
            return {
                data: CONTACT_INFO,
            };
        });
    return (
        <section id="contact-us" className="py-16 bg-primary">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 py-8 px-6 text-center bg-primary-foreground border border-primary/40 rounded-xl">
                {/* Heading */}
                <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-secondary">
                        Contact Us
                    </h1>
                    <p className="max-w-2xl mx-auto text-secondary font-medium">
                        Have questions or need assistance? Reach out to us via
                        phone or email, we’d love to hear from you.
                    </p>
                </div>

                {/* Contact Info Grid */}
                <Suspense fallback={<ContactInfoGrid />}>
                    <ContactInfoGrid contactInfoPromise={contactInfoPromise} />
                </Suspense>
            </div>
        </section>
    );
}

function ContactInfoGrid({ contactInfoPromise }: ContactInfoGridProps) {
    const shouldUseSkeleton = contactInfoPromise === undefined;
    const contactInfo = shouldUseSkeleton
        ? {
              phone: Array(3).fill(""),
              email: Array(2).fill(""),
          }
        : use(contactInfoPromise).data;
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl text-left">
                {contactInfo.phone.map(
                    (item: { text: string; href?: string }, index: number) => (
                        <div
                            key={index}
                            className="flex items-center p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-secondary-foreground border border-secondary/40 bg-secondary"
                        >
                            {shouldUseSkeleton ? (
                                <ContactInfoItemSkeleton />
                            ) : (
                                <ContactInfoItem
                                    icon={Phone}
                                    text={item.text}
                                    href={item.href}
                                />
                            )}
                        </div>
                    ),
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl text-left">
                {contactInfo.email.map(
                    (item: { text: string; href?: string }, index: number) => (
                        <div
                            key={index}
                            className="flex items-center p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-primary-foreground border border-secondary/40 bg-secondary"
                        >
                            {shouldUseSkeleton ? (
                                <ContactInfoItemSkeleton />
                            ) : (
                                <ContactInfoItem
                                    icon={Mail}
                                    text={item.text}
                                    href={item.href}
                                />
                            )}
                        </div>
                    ),
                )}
            </div>
        </>
    );
}

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
            <Icon className="h-5 w-5 shrink-0 text-primary-foreground" />
            <span className="text-primary-foreground text-base">{text}</span>
        </div>
    );

    return href ? (
        <Link
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
        >
            {content}
        </Link>
    ) : (
        content
    );
}

function ContactInfoItemSkeleton() {
    return (
        <div className="flex items-center space-x-3">
            {/* Icon placeholder */}
            <div className="h-5 w-5 rounded-full bg-gray-200 relative overflow-hidden">
                <Shimmer />
            </div>

            {/* Text placeholder */}
            <div className="h-5 w-32 bg-gray-200 rounded relative overflow-hidden">
                <Shimmer />
            </div>
        </div>
    );
}
