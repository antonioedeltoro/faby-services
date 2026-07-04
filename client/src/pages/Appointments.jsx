import "../styles/TaxSeason.css"; // reuse form/card/typography via partials
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useLang } from "../context/LanguageContext";

export default function Appointments() {
  const { t } = useLang();
  const [form, setForm] = useState({
    name: "",
    countryCode: "+1",
    phone: "",
    callAt: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = "fabymultiservicios@gmail.com";
    const subject = encodeURIComponent(t("appointments.email.subject"));
    const body = encodeURIComponent(
      `${t("appointments.email.intro")}\n\n` +
      `${t("appointments.email.name")}: ${form.name}\n` +
      `${t("appointments.email.phone")}: ${form.countryCode} ${form.phone}\n` +
      `${t("appointments.email.preferred")}: ${form.callAt || t("appointments.email.notSpecified")}\n\n` +
      `${t("appointments.email.message")}:\n${form.message || t("appointments.email.noMessage")}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleReset = () =>
    setForm({ name: "", countryCode: "+1", phone: "", callAt: "", message: "" });

  return (
    <div className="page-container tax-season-page">
      <Helmet>
        <title>{t("appointments.meta.title")}</title>
      </Helmet>

      <section className="tax-season-section">
        <div className="tax-content">
          <h1 className="heading-xl blue">{t("appointments.heading")}</h1>
          <p className="paragraph">
            {t("appointments.intro")}
          </p>

          <div className="card">
            <form className="enrollment-form" onSubmit={handleSubmit}>
              <label>
                {t("appointments.form.name")}
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                {t("appointments.form.phone")}
                <div className="phone-field">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                  >
                    <option value="+1">+1 ({t("appointments.countries.us")})</option>
                    <option value="+52">+52 ({t("appointments.countries.mx")})</option>
                    <option value="+503">+503 ({t("appointments.countries.sv")})</option>
                    <option value="+505">+505 ({t("appointments.countries.ni")})</option>
                    <option value="+506">+506 ({t("appointments.countries.cr")})</option>
                    <option value="+507">+507 ({t("appointments.countries.pa")})</option>
                    <option value="+57">+57 ({t("appointments.countries.co")})</option>
                    <option value="+34">+34 ({t("appointments.countries.es")})</option>
                    {/* extend if needed */}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </label>

              <label>
                {t("appointments.form.preferredDateTime")}
                <input
                  type="datetime-local"
                  name="callAt"
                  value={form.callAt}
                  onChange={handleChange}
                />
              </label>

              <label>
                {t("appointments.form.message")}
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder={t("appointments.form.messagePlaceholder")}
                />
              </label>

              <div className="enrollment-buttons">
                <button type="submit" className="button">{t("appointments.form.submit")}</button>
                <button
                  type="button"
                  className="button button--outline"
                  onClick={handleReset}
                >
                  {t("appointments.form.reset")}
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
