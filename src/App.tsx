import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";
import TrackOrder from "./pages/TrackOrder";
import ShippingReturns from "./pages/ShippingReturns";
import SizeGuide from "./pages/SizeGuide";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/context/AuthContext";
import Login from "./pages/Login";
import OrderHistory from "./pages/OrderHistory";
import UserProfile from "./pages/UserProfile";
import { useEffect } from 'react';
import { api } from './api/api';

import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./admin-dashboard/layout/AdminLayout";
import AdminDashboard from "./admin-dashboard/pages/Dashboard";
import AdminProducts from "./admin-dashboard/pages/Products";
import ProductForm from "./admin-dashboard/pages/ProductForm";
import AdminOrders from "./admin-dashboard/pages/Orders";
import OrderDetail from "./admin-dashboard/pages/OrderDetail";
import Inventory from "./admin-dashboard/pages/Inventory";
import Customers from "./admin-dashboard/pages/Customers";
import CustomerDetail from "./admin-dashboard/pages/CustomerDetail";
import Marketing from "./admin-dashboard/pages/Marketing";
import Automation from "./admin-dashboard/pages/Automation";
import Settings from "./admin-dashboard/pages/Settings";
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    api.get('/')
      .then(data => console.log('Backend connected:', data))
      .catch(err => console.error('Connection failed:', err));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/about" element={<About />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/track-order/:orderId" element={<TrackOrder />} />
                <Route path="/shipping-returns" element={<ShippingReturns />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/faq" element={<FAQ />} />

                {/* User Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/profile" element={<UserProfile />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="products/new" element={<ProductForm />} />
                    <Route path="products/:id" element={<ProductForm />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="orders/:id" element={<OrderDetail />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="customers/:id" element={<CustomerDetail />} />
                    <Route path="marketing" element={<Marketing />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="automation" element={<Automation />} />
                  </Route>
                </Route>

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};




export default App;
