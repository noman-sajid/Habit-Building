import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Twitter, Mail } from "lucide-react";
import logo from "../../assets/hb_logo1.png";

const Footer = () => {
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About", path: "/about" },
        { name: "Mission", path: "/mission" },
        { name: "Our Approach", path: "/approach" },
        { name: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Disclaimer", path: "/disclaimer" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "FAQ", path: "/faq" },
        { name: "Dashboard", path: "/dashboard" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Github size={22} />, href: "https://github.com/your-profile" },
    { icon: <Twitter size={22} />, href: "https://twitter.com/your-profile" },
    { icon: <Mail size={22} />, href: "mailto:hello@habisium.com" },
  ];

  return (
    <footer className="bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 font-inter">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Motto */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Habisium Logo" className="h-12 w-auto" />
              <span className="text-2xl font-poppins font-bold text-stone-800 dark:text-stone-100">
                Habisium
              </span>
            </Link>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              Building habits, one day at a time.
            </p>
          </div>

          {/* Footer Links */}
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-poppins font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-stone-500 dark:text-stone-400 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Habisium. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
