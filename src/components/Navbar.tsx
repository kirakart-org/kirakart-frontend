import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Search, Menu, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { productsApi, Product } from "@/api/products";
import { getImageUrl } from "@/lib/utils";

const Navbar = () => {
  const { getTotalItems, wishlist } = useCart();
  const { user, openAuthModal } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounce Search Logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setLoadingSuggestions(true);
        try {
          // Fetch up to 5 suggestions
          const results = await productsApi.search(searchQuery.trim());
          setSuggestions(results.slice(0, 5));
        } catch (error) {
          console.error("Failed to fetch suggestions", error);
        } finally {
          setLoadingSuggestions(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      setSuggestions([]); // Clear suggestions on full search
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (slug: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    setSuggestions([]);
    navigate(`/product/${slug}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-primary">
              Kirakart
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-fast"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium text-foreground hover:text-primary transition-fast"
            >
              Shop
            </Link>
            <Link
              to="/products?category=Silk"
              className="text-sm font-medium text-foreground hover:text-primary transition-fast"
            >
              Silk Sarees
            </Link>
            <Link
              to="/products?category=Designer"
              className="text-sm font-medium text-foreground hover:text-primary transition-fast"
            >
              Designer
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden lg:flex"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>

            {/* User */}
            {user ? (
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="hidden lg:flex" title="My Profile">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex"
                title="Login / Sign Up"
                onClick={() => openAuthModal()}
              >
                <User className="h-5 w-5" />
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col space-y-6 mt-8">
                  <Link
                    to="/"
                    className="text-lg font-medium text-foreground hover:text-primary transition-fast"
                  >
                    Home
                  </Link>
                  <Link
                    to="/products"
                    className="text-lg font-medium text-foreground hover:text-primary transition-fast"
                  >
                    Shop
                  </Link>
                  <Link
                    to="/products?category=Silk"
                    className="text-lg font-medium text-foreground hover:text-primary transition-fast"
                  >
                    Silk Sarees
                  </Link>
                  <Link
                    to="/products?category=Designer"
                    className="text-lg font-medium text-foreground hover:text-primary transition-fast"
                  >
                    Designer
                  </Link>

                  <div className="pt-4 border-t border-border mt-2">
                    {user ? (
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-fast py-2"
                      >
                        <User className="h-5 w-5" />
                        My Profile
                      </Link>
                    ) : (
                      <button
                        onClick={() => openAuthModal()}
                        className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-fast py-2 w-full text-left"
                      >
                        <User className="h-5 w-5" />
                        Login / Sign Up
                      </button>
                    )}
                  </div>

                  <div className="pt-2">
                    <form onSubmit={handleSearch}>
                      <Input
                        type="search"
                        placeholder="Search sarees..."
                        className="w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </form>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop Search Bar */}
        {searchOpen && (
          <div className="hidden lg:block pb-4 animate-fade-in" ref={searchContainerRef}>
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <div className="relative">
                {loadingSuggestions ? (
                  <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                ) : (
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
                <Input
                  type="search"
                  placeholder="Search for sarees, colors, occasions..."
                  className="w-full pl-9"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <ul>
                    {suggestions.map((product) => (
                      <li key={product.id}>
                        <button
                          onClick={() => handleSuggestionClick(product.slug)}
                          className="w-full flex items-center p-3 hover:bg-muted transition-colors text-left"
                        >
                          <img
                            src={getImageUrl(product.image)}
                            alt={product.name}
                            className="h-10 w-10 object-cover rounded mr-3"
                          />
                          <div>
                            <p className="font-medium text-sm text-foreground line-clamp-1">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>


          </div>
        )}
      </nav>
    </header >
  );
};

export default Navbar;
