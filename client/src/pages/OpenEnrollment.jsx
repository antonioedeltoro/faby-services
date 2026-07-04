import "../styles/OpenEnrollment.css";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useLang } from "../context/LanguageContext";

export default function OpenEnrollment() {
  const { t } = useLang();
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
      `Consulta de Inscripción Abierta: ${subject}`
    );
    const mailBody = encodeURIComponent(
      `Nueva solicitud de Inscripción Abierta:\n\n` +
        `Nombre: ${name}\n` +
        `Teléfono: ${countryCode} ${phone}\n` +
        `Asunto: ${subject}\n` +
        `Llamar el: ${callAt}\n\n` +
        `Mensaje:\n${message}`
    );

    window.location.href = `mailto:${email}?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleReset = () => {
    setFormData(initialFormState);
  };

  return (
    <div className="page-container open-enrollment-page">
      <Helmet>
        <title>{`${t("openEnrollment.meta.titlePrefix")} ${currentYear} | Faby Services ${t("openEnrollment.meta.titleSuffix")}`}</title>
      </Helmet>

      <section className="open-enrollment-section">
        <div className="enrollment-content">
          <h1 className="heading-xl blue">{`${t("openEnrollment.hero.heading")} ${currentYear}`}</h1>
          <p className="paragraph">{t("openEnrollment.hero.tagline")}</p>
          <p className="paragraph">
            {`${t("openEnrollment.hero.introPrefix")} ${currentYear} ${t("openEnrollment.hero.introSuffix")}`}
          </p>
          <p className="paragraph">{t("openEnrollment.hero.ready")}</p>

          <ul className="enrollment-list">
            <li>{t("openEnrollment.list.call")}</li>
            <li>
              {t("openEnrollment.list.form")}
            </li>
            <li>{t("openEnrollment.list.guidance")}</li>
            <li>{t("openEnrollment.list.coverage")}</li>
          </ul>

          {/* ---------- Card wrapper ---------- */}
          <div className="card">
            <form className="enrollment-form" onSubmit={handleSubmit}>
              <label>
                {t("openEnrollment.form.name")}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                {t("openEnrollment.form.phone")}
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
                    <option value="+34">+34 ({t("openEnrollment.countries.spain")})</option>
                    <option value="+502">+502 (Guatemala)</option>
                    <option value="+504">+504 (Honduras)</option>
                    <option value="+52">+52 ({t("openEnrollment.countries.mexico")})</option>
                    <option value="+505">+505 (Nicaragua)</option>
                    <option value="+507">+507 ({t("openEnrollment.countries.panama")})</option>
                    <option value="+595">+595 (Paraguay)</option>
                    <option value="+51">+51 ({t("openEnrollment.countries.peru")})</option>
                    <option value="+1">+1 ({t("openEnrollment.countries.unitedStates")})</option>
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
                {t("openEnrollment.form.subject")}
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t("openEnrollment.form.subjectPlaceholder")}</option>
                  <option value="Bookkeeping">{t("openEnrollment.subjects.bookkeeping")}</option>
                  <option value="Training Courses">{t("openEnrollment.subjects.trainingCourses")}</option>
                  <option value="Taxes">{t("openEnrollment.subjects.taxes")}</option>
                  <option value="Business Consulting Services">
                    {t("openEnrollment.subjects.businessConsulting")}
                  </option>
                  <option value="Covered California">Covered California</option>
                  <option value="Medicare">Medicare</option>
                </select>
              </label>

              <label>
                {t("openEnrollment.form.callback")}
                <input
                  type="datetime-local"
                  name="callAt"
                  value={formData.callAt}
                  onChange={handleChange}
                />
              </label>

              <label>
                {t("openEnrollment.form.message")}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder={t("openEnrollment.form.messagePlaceholder")}
                />
              </label>

              <div className="enrollment-buttons">
                <button type="submit" className="button">
                  {t("openEnrollment.form.submit")}
                </button>
                <button
                  type="button"
                  className="button button--outline"
                  onClick={handleReset}
                >
                  {t("openEnrollment.form.reset")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
