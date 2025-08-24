import {
  BannerCarousel,
  ProductsTable,
} from "@client-web/features/landing/components";
import { Suspense } from "react";
import {
  HERO_CAROUSEL_ITEMS,
  PRODUCTS,
} from "@client-web/features/landing/mocks";

export default function Hero() {
  const bannerCarouselItemsPromise = fetch("/cms/landing/carousel-banner")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error fetching carousel banner");
      }
      return res.json();
    })
    .catch(() => {
      // default to mock data
      return { data: HERO_CAROUSEL_ITEMS };
    });

  const productsPromise = fetch("/cms/landing/products")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error fetching products");
      }
      return res.json();
    })
    .catch(() => {
      // default to mock data
      return { data: PRODUCTS };
    });
  return (
    <section className="w-full h-full px-8 py-16 flex justify-center items-center gap-4 bg-gradient-to-b from-emerald-800 to-emerald-900 sm:px-24 xl:px-64">
      <Suspense fallback={<BannerCarousel />}>
        <BannerCarousel itemsPromise={bannerCarouselItemsPromise} />
      </Suspense>
      <Suspense fallback={<ProductsTable />}>
        <ProductsTable productsPromise={productsPromise} />
      </Suspense>
    </section>
  );
}
