"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@client-web/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Card, CardContent } from "@client-web/components/ui/card";
import { cn } from "@client-web/lib/utils";

/**
 * Describes the structure of a single carousel banner item.
 */
export type BannerCarouselItem = {
    title: string;
    description: string;
    image: string;
};

/**
 * Props for the BannerCarousel component.
 */
export type BannerCarouselProps = {
    items: BannerCarouselItem[];
    className?: string;
};

/**
 * BannerCarousel renders a rotating carousel of promotional banners,
 * each with a title, description, and image.
 *
 * @component
 * @param items - Array of banner data objects
 */
export default function BannerCarousel({
    items,
    className,
}: BannerCarouselProps) {
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]}
            className={cn("flex w-full rounded-lg overflow-hidden", className)}
        >
            <CarouselContent className="rounded-lg">
                {items.map((item, index) => (
                    <CarouselItem
                        key={index}
                        className="rounded-lg overflow-hidden"
                    >
                        <Card className="py-0 rounded-lg overflow-hidden border-none shadow-none">
                            <CardContent className="p-0 h-96">
                                <div className="flex flex-col md:flex-row h-full w-full">
                                    {/* Text Content */}
                                    <div className="flex-2 p-4 flex flex-col justify-center">
                                        <h1 className="text-3xl md:text-5xl xl:text-7xl font-extrabold mb-4 text-emerald-800 leading-tight">
                                            {item.title}
                                        </h1>
                                        <p className="text-lg md:text-xl text-gray-700 max-w-xl">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Image */}
                                    <div className="flex-1 relative h-full">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            className="object-cover"
                                            fill
                                            sizes="(min-width: 768px) 50vw, 100vw"
                                            priority={index === 0}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
