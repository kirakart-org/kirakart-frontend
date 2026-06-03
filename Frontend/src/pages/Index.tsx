import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Clock, Star, Sparkles, Heart as HeartIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn, getImageUrl } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { productsApi, Product } from "@/api/products";
import heroImage from "@/assets/hero-saree.jpg";
import { useState, useEffect } from "react";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll();
        setFeaturedProducts(data.slice(0, 4));
        setBestSellers(data.filter(p => p.mostOrdered).slice(0, 4));
        setNewArrivals(data.slice(0, 4)); // In real app, sort by date
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Full Screen Vertical on Mobile */}
      <section className="relative h-[calc(100vh-4rem)] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury Sarees Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 md:bg-gradient-to-r md:from-black/70 md:to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-center md:items-center justify-center md:justify-start">
          <div className="max-w-2xl text-white animate-fade-in text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <Sparkles className="h-5 w-5 text-luxury-gold" />
              <span className="text-sm font-medium tracking-wider uppercase text-luxury-gold">
                Handcrafted Elegance
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-4 md:mb-6 leading-tight">
              Premium Handcrafted Sarees
              <br />
              <span className="text-luxury-rose">for Every Occasion</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
              Discover exquisite collection of silk and designer sarees. Each piece tells a story of tradition and elegance.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
              <Link to="/products" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group tap-target tap-feedback"
                >
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-fast" />
                </Button>
              </Link>
              <Link to="/products?category=Designer" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-white/10 border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm tap-target tap-feedback"
                >
                  Designer Sarees
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Occasion */}
      <section className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-serif font-bold text-foreground mb-3 md:mb-4">
            Shop by Occasion
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect saree for every celebration
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Link to="/products?occasion=Wedding" className="tap-feedback">
            <div className="group relative h-48 md:h-64 rounded-lg overflow-hidden card-shadow hover:hover-shadow transition-smooth">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <img
                src="/src/assets/saree-3.jpg"
                alt="Wedding"
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                loading="lazy"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                <h3 className="text-lg md:text-2xl font-serif font-bold">Wedding</h3>
              </div>
            </div>
          </Link>

          <Link to="/products?occasion=Festival" className="tap-feedback">
            <div className="group relative h-48 md:h-64 rounded-lg overflow-hidden card-shadow hover:hover-shadow transition-smooth">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <img
                src="/src/assets/saree-1.jpg"
                alt="Festival"
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                loading="lazy"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                <h3 className="text-lg md:text-2xl font-serif font-bold">Festival</h3>
              </div>
            </div>
          </Link>

          <Link to="/products?occasion=Party" className="tap-feedback">
            <div className="group relative h-48 md:h-64 rounded-lg overflow-hidden card-shadow hover:hover-shadow transition-smooth">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <img
                src="/src/assets/saree-5.jpg"
                alt="Party"
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                loading="lazy"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                <h3 className="text-lg md:text-2xl font-serif font-bold">Party</h3>
              </div>
            </div>
          </Link>

          <Link to="/products?occasion=Traditional" className="tap-feedback">
            <div className="group relative h-48 md:h-64 rounded-lg overflow-hidden card-shadow hover:hover-shadow transition-smooth">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <img
                src={getImageUrl("saree-4.jpg")} // Assuming 'saree-4.jpg' is the image name for Traditional
                alt="Traditional" // Keeping alt as "Traditional" as product.name is not available here
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                loading="lazy"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                <h3 className="text-lg md:text-2xl font-serif font-bold">Traditional</h3>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Best Sellers - Strict 2-column on mobile */}
      <section className="gradient-subtle py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-serif font-bold text-foreground mb-3 md:mb-4">
              Best Sellers
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Our most loved sarees by customers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline" className="tap-target tap-feedback">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Love - Social Proof */}
      <section className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-serif font-bold text-foreground mb-3 md:mb-4">
            Loved by 10,000+ Customers
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Join our happy family of saree lovers
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          {[1, 2, 5, 6].map((num) => (
            <div key={num} className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src={getImageUrl(`saree-${num}.jpg`)}
                alt="Customer love"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-4 lg:px-8 py-12 md:py-16 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 text-primary mb-3 md:mb-4">
              <Star className="h-6 w-6 md:h-8 md:w-8" />
            </div>
            <h3 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">Premium Quality</h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Finest materials
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 text-primary mb-3 md:mb-4">
              <Sparkles className="h-6 w-6 md:h-8 md:w-8" />
            </div>
            <h3 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">Authentic</h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Traditional craft
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 text-primary mb-3 md:mb-4">
              <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">COD Available</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Pay on delivery</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 text-primary mb-3 md:mb-4">
              <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">Easy Returns</h3>
            <p className="text-xs md:text-sm text-muted-foreground">7-day policy</p>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}


      <Footer />
    </div>
  );
};

export default Index;
