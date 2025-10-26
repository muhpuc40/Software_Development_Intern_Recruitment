import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* University Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Premier University</h3>
            <p className="text-gray-300 text-sm">
              Premier University Chittagong is one of the leading private universities in Bangladesh, 
              committed to providing quality education and fostering innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition duration-200">University Website</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Academic Calendar</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Student Portal</a></li>
              <li><a href="#" className="hover:text-white transition duration-200">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>📧 info@puc.ac.bd</p>
              <p>📞 +880 31-656-656</p>
              <p>📍 1/A, O.R. Nizam Road, Chittagong</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Premier University Chittagong. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;