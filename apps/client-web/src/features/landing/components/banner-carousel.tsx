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
import { use } from "react";
import { Shimmer } from "@client-web/components";

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
  itemsPromise?: Promise<{ data: BannerCarouselItem[] }>;
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
  itemsPromise,
  className,
}: BannerCarouselProps) {
  const shouldUseSkeleton = itemsPromise === undefined;
  const items = itemsPromise ? use(itemsPromise).data : Array(3).fill(null);
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
        {items.map((item: BannerCarouselItem, index: number) =>
          shouldUseSkeleton ? (
            <BannerCarouselItemSkeleton key={index} />
          ) : (
            <BannerCarouselItem item={item} index={index} key={index} />
          ),
        )}
      </CarouselContent>
    </Carousel>
  );
}

function BannerCarouselItem({
  item,
  index,
}: {
  item: BannerCarouselItem;
  index: number;
}) {
  return (
    <CarouselItem className="rounded-lg overflow-hidden">
      <Card className="py-0 rounded-lg overflow-hidden border-none shadow-none bg-primary-foreground">
        <CardContent className="p-0 h-96">
          <div className="flex flex-col md:flex-row h-full w-full">
            {/* Text Content */}
            <div className="flex-2 p-4 flex flex-col justify-center">
              <h1 className="text-3xl md:text-5xl xl:text-7xl font-extrabold mb-4 text-primary leading-tight">
                {item.title}
              </h1>
              <p className="text-lg md:text-xl text-primary/90 max-w-xl">
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
  );
}

function BannerCarouselItemSkeleton() {
  return (
    <CarouselItem className="w-screen rounded-lg overflow-hidden">
      <Card className="py-0 rounded-lg overflow-hidden border-none shadow-none">
        <CardContent className="p-0 h-96">
          <div className="flex flex-col md:flex-row h-full w-full">
            {/* Text Content */}
            <div
              className="flex flex-col justify-center gap-4 p-6 
                            md:flex-[2] md:basis-0 w-full"
            >
              <div className="h-10 w-2/3 bg-gray-200 rounded relative overflow-hidden">
                <Shimmer />
              </div>
              <div className="h-4 w-5/6 bg-gray-200 rounded relative overflow-hidden">
                <Shimmer />
              </div>
              <div className="h-4 w-1/2 bg-gray-200 rounded relative overflow-hidden">
                <Shimmer />
              </div>
            </div>

            {/* Image */}
            <div className="relative h-48 md:h-full md:flex-[3] md:basis-0 w-full">
              <div className="h-full w-full bg-gray-200 rounded relative overflow-hidden">
                <Shimmer />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  );
}
