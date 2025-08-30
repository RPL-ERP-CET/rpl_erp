import {
    Nav,
    Hero,
    Footer,
    AboutUs,
    ExecutiveTeam,
    ContactUs,
} from "@client-web/features/landing/components";

export default function Landing() {
    return (
        <>
            <Nav />
            <Hero />
            <AboutUs />
            <ExecutiveTeam />
            <ContactUs />
            <Footer />
        </>
    );
}
