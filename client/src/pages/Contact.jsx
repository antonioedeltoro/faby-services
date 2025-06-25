import '../styles/Contact.css';
import { Helmet } from 'react-helmet';

export default function Contact() {
  return (
    <div className="page-container contact-page">
      <Helmet>
        <title>Contact | Faby Services Insurance & Taxes</title>
      </Helmet>

      <section className="contact-section">
        <div className="section-content">
          <h1 className="heading-xl blue">Contact Us</h1>
          <p className="paragraph">Have questions? We’re here to help.</p>

          <div className="contact-details">
            <p className="paragraph"><strong>Phone:</strong> (424) 249-0927 / (424) 361-7009</p>
            <p className="paragraph"><strong>Email:</strong> fabymultiservicios@gmail.com</p>
            <p className="paragraph"><strong>Location:</strong> 4862 W 95th St, Inglewood, CA 90301</p>
          </div>

          <p className="paragraph cta">
            Prefer to speak in person? Call or visit us during business hours.
          </p>
        </div>
      </section>
    </div>
  );
}
