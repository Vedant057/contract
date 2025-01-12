import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between sm:flex-row">
        <div>
          <p className="text-sm mb-4">© {new Date().getFullYear()} Contract Analyzer. All Rights Reserved.</p>
          <ul className="flex space-x-4">
            <li>
              <Link href="/about" className="hover:text-blue-500">About Us</Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-blue-500">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-blue-500">Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div className="flex space-x-4">
          <a href="mailto:contact@contractanalyzer.com" className="hover:text-blue-500">Contact Us</a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-blue-600 hover:text-blue-800" size={24} />
          </a>
          <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-blue-400 hover:text-blue-600" size={24} />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="text-blue-700 hover:text-blue-900" size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;