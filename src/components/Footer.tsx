import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">
              KiraKart
            </h3>
            <p className="text-muted-foreground mb-4">
              Curating the finest collection of handcrafted sarees for the modern woman.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-fast"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/kirakart__/"
                className="text-muted-foreground hover:text-primary transition-fast"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-fast"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-muted-foreground hover:text-primary transition-fast"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=Silk"
                  className="text-muted-foreground hover:text-primary transition-fast"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Silk Sarees
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=Designer"
                  className="text-muted-foreground hover:text-primary transition-fast"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Designer Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-fast"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Customer Care</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/track-order"
                  className="text-muted-foreground hover:text-primary transition-fast"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping-returns"
                  className="text-muted-foreground hover:text-primary transition-fast"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/size-guide"
                  className="text-muted-foreground hover:text-primary transition-fast"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-primary transition-fast"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-muted-foreground">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  No: 20, Canal Street, Triplicane Chennai 600005, Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">+91 8682886920</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">kirakartsupport@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Elegance Sarees. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
