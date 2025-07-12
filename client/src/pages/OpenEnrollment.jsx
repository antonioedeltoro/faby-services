import "../styles/OpenEnrollment.css";
import { Helmet } from "react-helmet";
import { useState } from "react";

export default function OpenEnrollment() {
  const currentYear = new Date().getFullYear();

  const initialFormState = {
    name: "",
    phone: "",
    countryCode: "+1",
    subject: "",
    callAt: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, phone, countryCode, subject, callAt, message } = formData;

    const email = "fabymultiservicios@gmail.com";
    const mailSubject = encodeURIComponent(
      `Open Enrollment Inquiry: ${subject}`
    );
    const mailBody = encodeURIComponent(
      `New Open Enrollment Submission:\n\n` +
        `Name: ${name}\n` +
        `Phone: ${countryCode} ${phone}\n` +
        `Subject: ${subject}\n` +
        `Call At: ${callAt}\n\n` +
        `Message:\n${message}`
    );

    window.location.href = `mailto:${email}?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleReset = () => {
    setFormData(initialFormState);
  };

  return (
    <div className="page-container open-enrollment-page">
      <Helmet>
        <title>{`Open Enrollment ${currentYear} | Faby Services Insurance & Taxes`}</title>
      </Helmet>

      <section className="open-enrollment-section">
        <div className="enrollment-content">
          <h1 className="heading-xl blue">{`Open Enrollment ${currentYear}`}</h1>
          <p className="paragraph">Enroll With Confidence</p>
          <p className="paragraph">
            {`Open Enrollment ${currentYear} is here. We’ll help you select from the best health insurance plans on the market.`}
          </p>
          <p className="paragraph">Ready to enroll?</p>

          <ul className="enrollment-list">
            <li>Call us at (424) 249‑0927 or (424) 361‑7009.</li>
            <li>
              Or fill out our online contact form, and we'll call you at your
              convenience.
            </li>
            <li>Get expert guidance every step of the way.</li>
            <li>Let’s find the right coverage for you.</li>
          </ul>

          {/* ---------- Card wrapper ---------- */}
          <div className="card">
            <form className="enrollment-form" onSubmit={handleSubmit}>
              <label>
                Full Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Phone Number
                <div className="phone-field">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                  >
                    <option value="+54">+54 (Argentina)</option>
                    <option value="+591">+591 (Bolivia)</option>
                    <option value="+56">+56 (Chile)</option>
                    <option value="+57">+57 (Colombia)</option>
                    <option value="+506">+506 (Costa Rica)</option>
                    <option value="+53">+53 (Cuba)</option>
                    <option value="+593">+593 (Ecuador)</option>
                    <option value="+503">+503 (El Salvador)</option>
                    <option value="+34">+34 (Spain)</option>
                    <option value="+502">+502 (Guatemala)</option>
                    <option value="+504">+504 (Honduras)</option>
                    <option value="+52">+52 (Mexico)</option>
                    <option value="+505">+505 (Nicaragua)</option>
                    <option value="+507">+507 (Panama)</option>
                    <option value="+595">+595 (Paraguay)</option>
                    <option value="+51">+51 (Peru)</option>
                    <option value="+1">+1 (United States)</option>
                    <option value="+598">+598 (Uruguay)</option>
                    <option value="+58">+58 (Venezuela)</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </label>

              <label>
                Subject
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="Bookkeeping">Bookkeeping</option>
                  <option value="Training Courses">Training Courses</option>
                  <option value="Taxes">Taxes</option>
                  <option value="Business Consulting Services">
                    Business Consulting Services
                  </option>
                  <option value="Covered California">Covered California</option>
                  <option value="Medicare">Medicare</option>
                </select>
              </label>

              <label>
                Callback Date and Time
                <input
                  type="datetime-local"
                  name="callAt"
                  value={formData.callAt}
                  onChange={handleChange}
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your case or situation..."
                />
              </label>

              <div className="enrollment-buttons">
                <button type="submit" className="button">
                  Submit
                </button>
                <button
                  type="button"
                  className="button button--outline"
                  onClick={handleReset}
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
