import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Package, Clock, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const OrderHistory = () => {
    const { orders } = useAuth();

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-serif font-bold text-foreground mb-8">Order History</h1>

                {orders.length === 0 ? (
                    <div className="text-center py-16 bg-muted/20 rounded-xl border border-dashed">
                        <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h2 className="text-xl font-medium mb-2">No orders yet</h2>
                        <p className="text-muted-foreground mb-6">Looks like you haven't made any purchases yet.</p>
                        <Link to="/products">
                            <Button>Start Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-card border rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-muted/30 p-4 flex flex-wrap gap-4 justify-between items-center text-sm">
                                    <div className="flex flex-col sm:flex-row sm:gap-6">
                                        <div>
                                            <span className="text-muted-foreground block text-xs uppercase tracking-wider">Order Placed</span>
                                            <span className="font-medium">{new Date(order.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="mt-2 sm:mt-0">
                                            <span className="text-muted-foreground block text-xs uppercase tracking-wider">Total</span>
                                            <span className="font-medium">₹{order.total.toLocaleString()}</span>
                                        </div>
                                        <div className="mt-2 sm:mt-0">
                                            <span className="text-muted-foreground block text-xs uppercase tracking-wider">Order #</span>
                                            <span className="font-medium">{order.id}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <Button variant="outline" size="sm">View Invoice</Button>
                                    </div>
                                </div>

                                <div className="p-4 sm:p-6">
                                    <div className="flex items-center gap-2 mb-4 text-green-600 font-medium">
                                        {order.status === "Delivered" ? (
                                            <Package className="w-5 h-5" />
                                        ) : (
                                            <Clock className="w-5 h-5 text-orange-500" />
                                        )}
                                        <span className={order.status === "Processing" ? "text-orange-500" : ""}>
                                            {order.status === "Processing" ? "Processing Order" : `Delivered`}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="h-20 w-16 bg-muted rounded overflow-hidden flex-shrink-0">
                                                    <img src={`/src/assets/${item.image}`} alt={item.name} className="h-full w-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-foreground">{item.name}</h3>
                                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                                    <p className="text-sm font-medium mt-1">₹{item.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Separator />
                                <div className="p-3 bg-muted/10 text-center">
                                    <Link to={`/track-order/${order.id}`} className="text-sm font-medium text-primary hover:underline">
                                        Track Package
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default OrderHistory;
