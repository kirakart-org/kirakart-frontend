import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Ruler, Scissors, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SizeGuide = () => {
    return (
        <div className="min-h-screen bg-[#faf9f6] text-stone-800 animate-fade-in font-sans">
            <Navbar />

            <main className="container max-w-2xl mx-auto px-6 py-12 md:py-16 leading-relaxed">

                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4 text-stone-900">
                        Size Guide
                    </h1>
                    <p className="text-stone-500">
                        Understanding measurements and fit.
                    </p>
                </div>

                {/* Saree Measurements */}
                <section className="mb-8 bg-white p-6 md:p-8 rounded-xl border border-stone-100 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                            <Ruler className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-medium text-stone-900">Saree Measurements</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-stone-600">
                        <div className="bg-stone-50 p-4 rounded-lg">
                            <span className="block text-sm text-stone-500 uppercase tracking-widest mb-1">Standard Length</span>
                            <span className="text-2xl font-serif text-stone-900">5.5 meters</span>
                            <p className="text-sm mt-2">Drapes comfortably for all heights.</p>
                        </div>
                        <div className="bg-stone-50 p-4 rounded-lg">
                            <span className="block text-sm text-stone-500 uppercase tracking-widest mb-1">Blouse Piece</span>
                            <span className="text-2xl font-serif text-stone-900">0.8 meters</span>
                            <p className="text-sm mt-2">Unstitched fabric included.</p>
                        </div>
                    </div>
                    <p className="mt-6 text-stone-600">
                        Most of our sarees come in a standard size that is designed to suit all body types. The drape is flexible and can be adjusted to your preference.
                    </p>
                </section>

                {/* Blouse Info */}
                <section className="mb-8 bg-white p-6 md:p-8 rounded-xl border border-stone-100 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center text-pink-600">
                            <Scissors className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-medium text-stone-900">Blouse Information</h2>
                    </div>

                    <div className="space-y-4 text-stone-600">
                        <p>
                            The blouse piece included with the saree is <strong>unstitched</strong>. This gives you the freedom to get it tailored exactly to your personal fit and style.
                        </p>
                        <p>
                            You can find specific fabric details on each product page to help you decide on the best styling.
                        </p>
                    </div>
                </section>

                {/* Need Help */}
                <section className="bg-primary/5 p-8 rounded-xl text-center border border-primary/10">
                    <HelpCircle className="w-8 h-8 mx-auto text-primary mb-3" />
                    <h3 className="text-lg font-medium text-stone-900 mb-2">Need help choosing?</h3>
                    <p className="text-stone-600 mb-6 max-w-sm mx-auto">
                        If you're unsure about the fabric, fall, or color, feel free to reach out. We're happy to help you choose the perfect one.
                    </p>
                    <Button className="gap-2">
                        WhatsApp Us
                    </Button>
                </section>

            </main>

            <WhatsAppButton />
            <Footer />
        </div>
    );
};

export default SizeGuide;
