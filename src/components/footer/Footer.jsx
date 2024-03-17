import "./footer.css";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="top">
        <div className="left">
          <span>Contact</span>
          <p>
            The Reading Retreat <br />
            near New Delhi <br />
            pin - 123456
          </p>
        </div>
        <div className="mid">
          <span>Tel 82350xxxxx</span>
          <br />
          <span>Email info@mysite.com</span>
          <br />
          <p>
            <Link href={"/"}>
              <FiFacebook />
            </Link>
            <Link href={"/"}>
              <FiInstagram />
            </Link>
            <Link href={"/"}>
              <FiTwitter />
            </Link>
          </p>
        </div>
        <div className="right">
          <span>Subscribe to Get Our Newsletter</span>
          <form>
            <input type="email" placeholder="Enter Your Email" />{" "}
            <button type="submit">Join</button>
          </form>
          <p>Thanks for submitting!</p>
        </div>
      </div>

      <div className="bottom">
        © 2024 by The Reading Retreat. Proudly created by Prashant Kumar
        Chaturvedi
      </div>
    </footer>
  );
};

export default Footer;
