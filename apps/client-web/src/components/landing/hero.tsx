import { BannerCarousel, ProductsTable } from "@client-web/components/landing";

// temporary static data (add support for cms)
const HERO_CAROUSEL_ITEMS = [
    {
        title: "Rehabilitation Plantations Ltd",
        description:
            "Rehabilitation Plantations Ltd, producers of natural rubber since 1976 and manufacturers of rubber based products!",
        image: "https://content.jdmagicbox.com/comp/kollam/36/9999pmulblrstd2001136/catalogue/rehabilitation-plantations-ltd-registered-office-punalur-kollam-government-organisations-mytnu5nhop.jpg",
    },
    {
        title: "Quality and Environment Management",
        description:
            "Rated among the best in India with ISO certification for Quality and Complying with ISO standard for Environment Management System",
        image: "https://img.gujaratijagran.com/2023/10/Rubber-one.jpg",
    },
];

const PRODUCTS = [
    {
        displayName: "60%  Latex  (in Barrels) w.e.f.25.06.2025",
        unit: "kg",
        rate: 10,
    },
    {
        displayName: "60%  Latex (in Tankers) w.e.f.25.06.2025",
        unit: "kg",
        rate: 10,
    },
    {
        displayName: "ISNR 10 (w.e.f. 21.02.2025)",
        unit: "kg",
        rate: 10,
    },
];

export default function Hero() {
    return (
        <section className="w-full h-full px-8 py-16 flex gap-4 bg-gradient-to-b from-emerald-800 to-emerald-900">
            <BannerCarousel items={HERO_CAROUSEL_ITEMS} />
            <ProductsTable products={PRODUCTS} />
        </section>
    );
}
