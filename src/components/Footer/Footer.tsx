import "./Footer.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Welcome to FetanFews, your trusted platform for locating nearby
            pharmacies and drug availability. Our mission is to make accessing
            essential medicines easy and convenient for everyone.
          </p>
        </div>
        <div className="footer-section">
          <h3>Our Services</h3>
          <ul>
            <li>
			<Link to="/">Find Nearby Drugs</Link>
            </li>
            <li>
			<Link to="/">Pharmacy Locator</Link>
            </li>
            <li>
			<Link to="/">rder Online</Link>
            </li>
            <li>
			<Link to="/">Consult with Experts</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              {" "}
              <Link to="/">About Us </Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
            <li>
              <Link to="/">Services </Link>
            </li>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@medlocator.com</p>
          <p>Phone: +251 95323 7890</p>
          <p>Address: Bahir Dar, Ethiopia</p>
        </div>
        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com/medlocator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/medlocator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/medlocator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/medlocator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/medlocator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FetanFews. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
