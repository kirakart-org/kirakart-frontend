import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrackOrderLogin from "@/components/track-order/TrackOrderLogin";
import OrderTimeline from "@/components/track-order/OrderTimeline";
import { ChevronDown, ChevronUp, MessageCircle, Phone, Mail, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react"; // Removed mock data import
import { Skeleton } from "@/components/ui/skeleton";
import { getImageUrl } from "@/lib/utils";

const TrackOrder = () => {
    const { orderId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);

    // Placeholder for when we have real backend integration
    // const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        if (orderId) {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [orderId]);

    if (!orderId) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                    <TrackOrderLogin />
                </main>
                <Footer />
            </div>
        );
    }

    // Since we don't have a real Order API yet, we show a generic state or "Not Found" 
    // rather than fake data, to comply with "Real Data Only" request.
    // For now, I'll keep the UI structure but remove specific fake product details.

    return (
        <div className="min-h-screen bg-[#faf9f6] animate-fade-in pb-20">
            <Navbar />

            <main className="container max-w-lg mx-auto px-4 py-8">

                {isLoading ? (
                    <div className="space-y-6">
                        <Skeleton className="h-8 w-3/4 mx-auto" />
                        <Skeleton className="h-64 w-full rounded-xl" />
                        <Skeleton className="h-32 w-full rounded-xl" />
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full text-primary mb-4">
                                <Package className="w-6 h-6" />
                            </div>
                            <h1 className="text-2xl font-serif font-bold text-gray-900 mb-1">
                                Tracking Details
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                Order #{orderId}
                            </p>
                            <p className="text-xs text-amber-600 mt-2 bg-amber-50 inline-block px-3 py-1 rounded-full border border-amber-100">
                                This feature is under development (Backend Integration Pending)
                            </p>
                        </div>

                        {/* Need Help Section */}
                        <div className="text-center mt-8">
                            <p className="text-sm text-muted-foreground mb-4">Need help with this order?</p>
                            <div className="grid grid-cols-2 gap-3">
                                <Link to="https://wa.me/yournumber">
                                    <Button variant="outline" className="w-full bg-white border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 hover:border-green-300">
                                        <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                                    </Button>
                                </Link>
                                <Button variant="outline" className="w-full bg-white">
                                    <Phone className="w-4 h-4 mr-2" /> Call Us
                                </Button>
                            </div>
                        </div>
                    </>
                )}

            </main>

            <div className="hidden md:block">
                <Footer />
            </div>
            <WhatsAppButton />
        </div>
    );
};

export default TrackOrder;
