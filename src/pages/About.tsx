import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#faf9f6] text-stone-800 animate-fade-in font-serif">
            <Navbar />

            <main className="container max-w-2xl mx-auto px-6 py-12 md:py-20 leading-relaxed md:leading-loose">
                {/* Back navigation for mobile feeling */}
                <div className="md:hidden mb-8">
                    <Button variant="ghost" size="sm" className="-ml-3 text-stone-500 hover:text-stone-900" onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                </div>

                {/* Introduction */}
                <section className="mb-16">
                    <h1 className="text-3xl md:text-4xl font-normal mb-8 text-stone-900 tracking-tight">
                        Six yards of memory.
                    </h1>
                    <p className="text-lg md:text-xl text-stone-600 mb-6 font-sans font-light">
                        Sarees have always been more than just fabric to us. They are the smell of camphor in a cupboard, the rustle of silk on a festival morning, and the softness of a grandmother's embrace.
                    </p>
                    <p className="text-lg md:text-xl text-stone-600 font-sans font-light">
                        They are memories that wrap around you.
                    </p>
                </section>

                {/* Why we exist */}
                <section className="mb-16">
                    <h2 className="text-xl font-medium mb-4 text-stone-800">A quiet beginning</h2>
                    <p className="text-base md:text-lg text-stone-600 mb-6 font-sans">
                        We didn't start this to change the world or to be the biggest brand in the country. We simply wanted to find the kind of sarees that felt like home. The ones you reach for without thinking.
                    </p>
                    <p className="text-base md:text-lg text-stone-600 font-sans">
                        In a world that screams for attention, we wanted to create something that whispers.
                    </p>
                </section>

                {/* The Process */}
                <section className="mb-16">
                    <h2 className="text-xl font-medium mb-4 text-stone-800">Chosen slowly</h2>
                    <p className="text-base md:text-lg text-stone-600 mb-6 font-sans">
                        We take our time. We choose our collection slowly, deliberately. We touch every fabric. We breathe in its texture.
                    </p>
                    <p className="text-base md:text-lg text-stone-600 font-sans">
                        If a saree doesn't feel kind to the skin, it doesn't find a place here. We believe that comfort is the truest form of luxury.
                    </p>
                </section>

                {/* The People */}
                <section className="mb-16">
                    <h2 className="text-xl font-medium mb-4 text-stone-800">Hands that weave</h2>
                    <p className="text-base md:text-lg text-stone-600 font-sans">
                        The weavers we work with are not just suppliers to us. They are artists who have known the loom longer than we have known words. We respect their rhythm, their craft, and their life. We don't rush them. Good things, living things, take time.
                    </p>
                </section>

                {/* Everyday Life */}
                <section className="mb-16">
                    <h2 className="text-xl font-medium mb-4 text-stone-800">For every day</h2>
                    <p className="text-base md:text-lg text-stone-600 font-sans mb-6">
                        We believe a saree belongs in the boardroom just as much as it belongs at a wedding. It belongs in the chaos of a Monday morning and the quiet of a Sunday afternoon.
                    </p>
                    <p className="text-base md:text-lg text-stone-600 font-sans">
                        It doesn't need an occasion. It just needs you.
                    </p>
                </section>

                {/* Closing */}
                <section className="border-t border-stone-200 pt-12 mt-12 text-center">
                    <p className="text-base md:text-lg text-stone-600 mb-8 font-sans italic">
                        "Thank you for stopping by. For pausing in your day to look at something beautiful. We hope you find a piece of yourself here."
                    </p>

                    <Link to="/products">
                        <Button variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100 hover:text-stone-900 px-8 py-6 rounded-full text-base tracking-wide transition-all duration-300">
                            Explore our collection
                        </Button>
                    </Link>
                </section>

            </main>

            <WhatsAppButton />
            <Footer />
        </div>
    );
};

export default About;
