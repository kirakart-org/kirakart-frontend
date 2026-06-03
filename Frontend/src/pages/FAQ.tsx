import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";

const FAQ = () => {
    return (
        <div className="min-h-screen bg-[#faf9f6] text-stone-800 animate-fade-in font-sans">
            <Navbar />

            <main className="container max-w-2xl mx-auto px-6 py-12 md:py-16 leading-relaxed">

                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4 text-stone-900">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-stone-500">
                        Everything you need to know.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Orders & Payments */}
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4 px-2">Orders & Payments</h2>
                        <div className="bg-white rounded-xl border border-stone-100 overflow-hidden shadow-sm">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">How do I place an order?</AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 text-stone-600">
                                        Simply browse our collection, select the saree you love, and click "Add to Cart". When you're ready, proceed to checkout where you can enter your address and complete the payment.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">Is Cash on Delivery available?</AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 text-stone-600">
                                        Yes, we offer Cash on Delivery (COD) for most pincodes across India. You can choose this option at checkout and pay when your order arrives.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">What payment methods do you accept?</AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 text-stone-600">
                                        We accept all major credit/debit cards, net banking, UPI (Google Pay, PhonePe, Paytm), and Cash on Delivery.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </section>

                    {/* Shipping */}
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4 px-2">Shipping</h2>
                        <div className="bg-white rounded-xl border border-stone-100 overflow-hidden shadow-sm">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-4">
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">How can I track my order?</AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 text-stone-600">
                                        Once your order is shipped, we'll send you a tracking link via SMS/Email. You can also use our "Track Order" page with your Order ID.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-5">
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">How long will it take to arrive?</AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 text-stone-600">
                                        Usually, it takes 3–7 working days for delivery. We try our best to get it to you as soon as possible.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </section>

                    {/* Returns */}
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4 px-2">Returns & Support</h2>
                        <div className="bg-white rounded-xl border border-stone-100 overflow-hidden shadow-sm">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-6">
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">What is your return policy?</AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 text-stone-600">
                                        We have a simple 7-day return policy. If you're not happy with the product, please keep it unused with tags intact and contact us. We'll help you with the rest.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-7">
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">Will the saree look exactly like the photo?</AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 text-stone-600">
                                        We try our best to show accurate colors, but slight variations can happen due to screen settings and lighting. The beauty of handloom is in these unique nuances.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-8">
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">How can I contact support?</AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 text-stone-600 justify-center flex flex-col items-center gap-2">
                                        <p>We are available on WhatsApp and Email to assist you.</p>
                                        <div className="flex gap-2 mt-2">
                                            <a href="#" className="flex items-center gap-1 text-primary font-medium bg-primary/10 px-3 py-1 rounded-full text-sm hover:bg-primary/20 transition-colors">
                                                <MessageCircle className="w-4 h-4" /> WhatsApp Us
                                            </a>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </section>
                </div>

            </main>

            <WhatsAppButton />
            <Footer />
        </div>
    );
};

export default FAQ;
