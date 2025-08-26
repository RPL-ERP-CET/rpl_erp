import { Suspense, use } from "react";
import Image from "next/image";
import { Shimmer } from "@client-web/components";
import { ABOUT_US_CONTENT } from "@client-web/features/landing/mocks";

type AboutUsContent = {
    title: string;
    description: string;
    image: string;
};

type AboutUsResponse = {
    data: AboutUsContent[];
};

type AboutUsProps = {
    contentPromise?: Promise<AboutUsResponse>;
};

export default function AboutUsContainer() {
    const aboutUsContentPromise: Promise<AboutUsResponse> = fetch(
        "/cms/landing/about-us",
    )
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch about us content");
            }
            return res.json();
        })
        .catch(() => {
            return { data: ABOUT_US_CONTENT };
        }) as Promise<AboutUsResponse>;

    return (
        <Suspense fallback={<AboutUs />}>
            <AboutUs contentPromise={aboutUsContentPromise} />
        </Suspense>
    );
}

function AboutUs({ contentPromise }: AboutUsProps) {
    const shouldUseSkeleton = contentPromise === undefined;
    const content = shouldUseSkeleton
        ? Array(3).fill(null)
        : use(contentPromise).data;
    return (
        <section
            id="about-us"
            className="px-8 py-16 flex flex-col gap-4 bg-primary-foreground sm:px-24 lg:flex-row xl:px-64"
        >
            {content.map((content: AboutUsContent, index: number) =>
                shouldUseSkeleton ? (
                    <AboutUsCardSkeleton key={index} />
                ) : (
                    <AboutUsCard key={index} content={content} />
                ),
            )}
        </section>
    );
}

const AboutUsCard = ({ content }: { content: AboutUsContent }) => {
    return (
        <div className="relative w-full h-96 shadow-md rounded-2xl overflow-hidden group hover:shadow-primary/40 hover:border hover:border-primary/40 transition-all ease-in-out duration-500">
            {/* Background Image with hover zoom */}
            <Image
                src={content.image}
                alt={content.title}
                width={300}
                height={400}
                className="absolute z-0 w-full h-full object-cover rounded-2xl transform group-hover:scale-105 group-hover:brightness-90 transition-all duration-700 ease-in-out"
            />

            {/* Overlay with gradient */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-10 bg-gradient-to-t from-primary/90 via-primary/70 to-transparent text-white transition-all duration-700 ease-in-out max-h-24 group-hover:max-h-full overflow-hidden">
                {/* Title (always visible, animates slightly on hover) */}
                <h2 className="text-2xl font-extrabold tracking-wide drop-shadow-md transition-all duration-700 group-hover:translate-y-[-4px]">
                    {content.title}
                </h2>

                {/* Description (slides in on hover with fade) */}
                <p className="mt-3 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-1000 ease-out delay-200">
                    {content.description}
                </p>
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:ring-4 group-hover:ring-emerald-400/30 transition-all duration-700"></div>
        </div>
    );
};

const AboutUsCardSkeleton = () => {
    return (
        <div className="relative w-full h-96 shadow-md rounded-2xl border overflow-hidden group transition-all ease-in-out duration-500">
            {/* Background placeholder */}
            <div className="absolute z-0 w-full h-full bg-gray-200 rounded-2xl overflow-hidden">
                <Shimmer />
            </div>

            {/* Overlay with gradient */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-10 bg-gradient-to-t from-gray-400/60 via-gray-300/40 to-transparent text-white transition-all duration-700 ease-in-out max-h-24 group-hover:max-h-full overflow-hidden">
                {/* Title placeholder */}
                <div className="h-8 w-2/3 bg-gray-300 rounded relative overflow-hidden">
                    <Shimmer />
                </div>

                {/* Description placeholder */}
                <div className="mt-3 space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out delay-200">
                    <div className="h-4 w-full bg-gray-300 rounded relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="h-4 w-5/6 bg-gray-300 rounded relative overflow-hidden">
                        <Shimmer />
                    </div>
                    <div className="h-4 w-2/3 bg-gray-300 rounded relative overflow-hidden">
                        <Shimmer />
                    </div>
                </div>
            </div>

            {/* Glow effect on hover (kept for consistency) */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:ring-4 group-hover:ring-gray-300/30 transition-all duration-700"></div>
        </div>
    );
};
