import '../styles/Services.css';
import { Helmet } from 'react-helmet';

export default function Services() {
  return (
    <div className="page-container services-page">
      <Helmet>
        <title>Services | Faby Services Insurance & Taxes</title>
      </Helmet>

      <section className="services-section">
        <div className="section-content">
          <h1 className="heading-xl blue">Explore Our Services</h1>

          <div className="service-block">
            <h2 className="subheading">Health Insurance</h2>
            <p className="paragraph">
              Protect yourself and your loved ones. We offer a full range of coverage options through Covered California and other trusted providers.
            </p>
          </div>

          <div className="service-block">
            <h2 className="subheading">Tax Services</h2>
            <p className="paragraph">
              Whether you're filing personal or corporate taxes, our experienced advisors ensure accurate, compliant, and timely filings.
            </p>
          </div>

          <div className="service-block">
            <h2 className="subheading">Bookkeeping</h2>
            <p className="paragraph">
              Let us handle the books, payroll, accounts receivable/payable, and tax records—so you can focus on running your business.
            </p>
          </div>

          <div className="service-block">
            <h2 className="subheading">Training Courses</h2>
            <p className="paragraph">
              Stay up to date with the latest in federal and tax law. No prior experience needed—just the desire to learn and grow.
            </p>
          </div>

          <p className="paragraph cta">
            For expert help and real business results—let’s get started.
          </p>
        </div>
      </section>
    </div>
  );
}
