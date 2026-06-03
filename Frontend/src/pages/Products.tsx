import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import FilterChip from "@/components/FilterChip";
import { priceRanges } from "@/lib/constants";
import { productsApi, Product } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dynamic Filters
  const [categories, setCategories] = useState<string[]>([]);
  const [occasions, setOccasions] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [selectedOccasion, setSelectedOccasion] = useState(
    searchParams.get("occasion") || "All"
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = searchParams.get("q");

        const [productsData, categoriesData, occasionsData] = await Promise.all([
          query ? productsApi.search(query) : productsApi.getAll(),
          productsApi.getCategories(),
          productsApi.getOccasions()
        ]);

        setProducts(productsData);
        setCategories(["All", ...categoriesData.map(c => c.name)]);
        setOccasions(["All", ...occasionsData.map(o => o.name)]);

      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory !== "All" && product.category !== selectedCategory)
        return false;
      if (selectedOccasion !== "All" && !product.occasion.includes(selectedOccasion))
        return false;
      if (selectedPriceRange !== "All") {
        const range = priceRanges.find((r) => r.label === selectedPriceRange);
        if (range && (product.price < range.min || product.price > range.max))
          return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0; // featured is default order from backend
      }
    });

  const activeFilters = [];
  if (selectedCategory !== "All") activeFilters.push({ type: "category", value: selectedCategory });
  if (selectedOccasion !== "All") activeFilters.push({ type: "occasion", value: selectedOccasion });
  if (selectedPriceRange !== "All") activeFilters.push({ type: "price", value: selectedPriceRange });

  const removeFilter = (type: string) => {
    if (type === "category") setSelectedCategory("All");
    if (type === "occasion") setSelectedOccasion("All");
    if (type === "price") setSelectedPriceRange("All");
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`block w-full text-left px-3 py-2.5 rounded-md transition-fast tap-feedback ${selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">Occasion</h3>
        <div className="space-y-2">
          {occasions.map((occasion) => (
            <button
              key={occasion}
              onClick={() => setSelectedOccasion(occasion)}
              className={`block w-full text-left px-3 py-2.5 rounded-md transition-fast tap-feedback ${selectedOccasion === occasion
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
                }`}
            >
              {occasion}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setSelectedPriceRange(range.label)}
              className={`block w-full text-left px-3 py-2.5 rounded-md transition-fast tap-feedback ${selectedPriceRange === range.label
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
                }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navbar />

      <main className="container mx-auto px-4 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-serif font-bold text-foreground mb-2">
            Our Collection
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {/* Active Filters - Mobile Optimized */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {activeFilters.map((filter) => (
              <FilterChip
                key={filter.type}
                label={filter.value}
                onRemove={() => removeFilter(filter.type)}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-lg p-6 card-shadow">
              <h2 className="text-xl font-serif font-bold mb-6">Filters</h2>
              <FilterPanel />
            </div>
          </aside>

          {/* Products Grid - Strict 2-column on mobile */}
          <div className="flex-1">
            {/* Desktop Sort */}
            <div className="hidden md:flex items-center justify-end mb-6">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Product Grid - Always 2 columns on mobile */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[250px] w-full rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-base md:text-lg text-muted-foreground mb-4">
                  No products found matching your filters.
                </p>
                <Button
                  variant="outline"
                  className="tap-target tap-feedback"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedOccasion("All");
                    setSelectedPriceRange("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-background via-background to-background/95 backdrop-blur-sm border-t border-border p-4 md:hidden safe-area-bottom">
        <div className="container mx-auto flex gap-3">
          {/* Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 tap-target tap-feedback relative"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFilters.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {activeFilters.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
              <SheetHeader>
                <SheetTitle className="text-xl font-serif">Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6 overflow-y-auto h-[calc(80vh-100px)] pb-20">
                <FilterPanel />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 tap-target tap-feedback"
              >
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto rounded-t-2xl">
              <SheetHeader>
                <SheetTitle className="text-xl font-serif">Sort By</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-2 pb-6">
                {[
                  { value: "featured", label: "Featured" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                  { value: "rating", label: "Highest Rated" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`block w-full text-left px-4 py-3 rounded-md transition-fast tap-feedback ${sortBy === option.value
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton />

      <Footer />
    </div>
  );
};

export default Products;
