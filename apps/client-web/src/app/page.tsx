import {
    Nav,
    Hero,
    Footer,
    AboutUs,
    ExecutiveTeam,
    ContactUs,
} from "@client-web/components/landing";

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
