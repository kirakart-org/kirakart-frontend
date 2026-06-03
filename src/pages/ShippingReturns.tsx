import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Truck, RotateCcw, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShippingReturns = () => {
    return (
        <div className="min-h-screen bg-[#faf9f6] text-stone-800 animate-fade-in font-sans">
            <Navbar />

            <main className="container max-w-2xl mx-auto px-6 py-12 md:py-16 leading-relaxed">

                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4 text-stone-900">
                        Shipping & Returns
                    </h1>
                    <p className="text-stone-500">
                        Simple, transparent, and hassle-free.
                    </p>
                </div>

                {/* Shipping Section */}
                <section className="mb-12 bg-white p-6 md:p-8 rounded-xl border border-stone-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                            <Truck className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-medium text-stone-900">Shipping</h2>
                    </div>

                    <div className="space-y-6 text-stone-600">
                        <div>
                            <h3 className="font-medium text-stone-800 mb-2">When do we ship?</h3>
                            <p>
                                Once your order is placed, we begin preparing it with care. Most orders are processed and handed over to our delivery partners within 1–2 working days.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium text-stone-800 mb-2">How long does delivery take?</h3>
                            <p>
                                Delivery usually takes between 3 to 7 working days, depending on where you are located. We'll share a tracking link with you as soon as it's on the way, so you'll know exactly when to expect it.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium text-stone-800 mb-2">Cash on Delivery</h3>
                            <p>
                                We understand if you prefer to pay when you receive your order. COD is available for most locations within India.
                            </p>
                        </div>

                        <p className="text-sm bg-stone-50 p-3 rounded-lg border border-stone-100">
                            Note: During festivals or high-volume periods, delivery might take a little longer. We appreciate your patience.
                        </p>
                    </div>
                </section>

                {/* Returns Section */}
                <section className="mb-12 bg-white p-6 md:p-8 rounded-xl border border-stone-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                            <RotateCcw className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-medium text-stone-900">Returns & Exchanges</h2>
                    </div>

                    <div className="space-y-6 text-stone-600">
                        <p className="leading-relaxed">
                            We want you to love your saree. If something doesn't feel right, we're here to help.
                        </p>

                        <div>
                            <h3 className="font-medium text-stone-800 mb-2">Our Policy</h3>
                            <p>
                                You can request a return or exchange within 7 days of receiving your order. All we ask is that the product remains unused and in its original condition with tags intact.
                            </p>
                        </div>

                        <div className="bg-stone-50 p-4 rounded-lg">
                            <h3 className="font-medium text-stone-800 mb-3">How to return in 3 simple steps:</h3>
                            <ol className="list-decimal list-inside space-y-2 text-stone-600">
                                <li>Contact our support team via WhatsApp or Email.</li>
                                <li>We'll arrange a pickup or share instructions.</li>
                                <li>Once verified, we'll process your refund or exchange.</li>
                            </ol>
                        </div>
                    </div>
                </section>

                <div className="text-center">
                    <p className="text-stone-500 mb-4">Still have questions? We're just a message away.</p>
                    <Button variant="outline" className="gap-2">
                        <MessageCircle className="w-4 h-4" /> Chat with us
                    </Button>
                </div>

            </main>

            <WhatsAppButton />
            <Footer />
        </div>
    );
};

export default ShippingReturns;
