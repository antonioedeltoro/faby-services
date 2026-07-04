import "../styles/TaxSeason.css";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useLang } from "../context/LanguageContext";

export default function TaxSeason() {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();

  const initialFormState = {
    // Taxpayer
    taxpayerName: "",
    taxpayerDob: "",
    taxpayerCountryCode: "+1",
    taxpayerPhone: "",

    // Spouse (optional)
    spouseName: "",
    spouseDob: "",
    spouseCountryCode: "+1",
    spousePhone: "",

    // Dependents
    dependentsCount: 0,
    dependentsDob: [],

    // Message
    message: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If changing dependentsCount, resize the dependentsDob array
    if (name === "dependentsCount") {
      const count = Math.max(0, Math.min(20, Number(value) || 0)); // clamp 0–20
      const next = [...formData.dependentsDob];

      if (count > next.length) {
        while (next.length < count) next.push("");
      } else if (count < next.length) {
        next.length = count;
      }

      setFormData((prev) => ({
        ...prev,
        dependentsCount: count,
        dependentsDob: next,
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDependentDobChange = (index, value) => {
    setFormData((prev) => {
      const next = [...prev.dependentsDob];
      next[index] = value;
      return { ...prev, dependentsDob: next };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      taxpayerName,
      taxpayerDob,
      taxpayerCountryCode,
      taxpayerPhone,
      spouseName,
      spouseDob,
      spouseCountryCode,
      spousePhone,
      dependentsCount,
      dependentsDob,
      message,
    } = formData;

    const email = "fabymultiservicios@gmail.com";
    const mailSubject = encodeURIComponent(
      `${t("taxSeason.email.subjectPrefix")} ${currentYear}`
    );

    const depLines =
      dependentsCount > 0
        ? dependentsDob
            .map((d, i) => `${t("taxSeason.email.dependentLine")} #${i + 1} - ${t("taxSeason.email.dobLabel")}: ${d || t("taxSeason.email.noDate")}`)
            .join("\n")
        : "N/A";

    const mailBody = encodeURIComponent(
      `${t("taxSeason.email.bodyIntroPrefix")} ${currentYear}:\n\n` +
        `${t("taxSeason.email.taxpayerHeading")}\n` +
        `• ${t("taxSeason.email.fullNameLabel")}: ${taxpayerName}\n` +
        `• ${t("taxSeason.email.dobLabel")}: ${taxpayerDob}\n` +
        `• ${t("taxSeason.email.phoneLabel")}: ${taxpayerCountryCode} ${taxpayerPhone}\n\n` +
        `${t("taxSeason.email.spouseHeading")}\n` +
        `• ${t("taxSeason.email.nameLabel")}: ${spouseName || "N/A"}\n` +
        `• ${t("taxSeason.email.dobLabel")}: ${spouseDob || "N/A"}\n` +
        `• ${t("taxSeason.email.phoneLabel")}: ${
          spousePhone ? `${spouseCountryCode} ${spousePhone}` : "N/A"
        }\n\n` +
        `${t("taxSeason.email.dependentsHeading")}\n` +
        `• ${t("taxSeason.email.dependentsCountLabel")}: ${dependentsCount}\n` +
        `${depLines}\n\n` +
        `${t("taxSeason.email.messageLabel")}:\n${message || t("taxSeason.email.noMessage")}`
    );

    window.location.href = `mailto:${email}?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleReset = () => {
    setFormData(initialFormState);
  };

  return (
    <div className="page-container tax-season-page">
      <Helmet>
        <title>{`${t("taxSeason.meta.titlePrefix")} ${currentYear} | Faby Services`}</title>
      </Helmet>

      <section className="tax-season-section">
        <div className="tax-content">
          <h1 className="heading-xl blue">{`${t("taxSeason.hero.headingPrefix")} ${currentYear}`}</h1>
          <p className="paragraph">{t("taxSeason.hero.tagline")}</p>
          <p className="paragraph">
            {`${t("taxSeason.hero.introPrefix")} ${currentYear} ${t("taxSeason.hero.introSuffix")}`}
          </p>

          {/* ---------- Card wrapper ---------- */}
          <div className="card">
            <form className="enrollment-form" onSubmit={handleSubmit}>
              {/* Taxpayer */}
              <label>
                {t("taxSeason.form.taxpayerName")}
                <input
                  type="text"
                  name="taxpayerName"
                  value={formData.taxpayerName}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                {t("taxSeason.form.taxpayerDob")}
                <input
                  type="date"
                  name="taxpayerDob"
                  value={formData.taxpayerDob}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                {t("taxSeason.form.taxpayerPhone")}
                <div className="phone-field">
                  <select
                    name="taxpayerCountryCode"
                    value={formData.taxpayerCountryCode}
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
                    <option value="+34">{`+34 (${t("taxSeason.countries.spain")})`}</option>
                    <option value="+502">+502 (Guatemala)</option>
                    <option value="+504">+504 (Honduras)</option>
                    <option value="+52">{`+52 (${t("taxSeason.countries.mexico")})`}</option>
                    <option value="+505">+505 (Nicaragua)</option>
                    <option value="+507">{`+507 (${t("taxSeason.countries.panama")})`}</option>
                    <option value="+595">+595 (Paraguay)</option>
                    <option value="+51">{`+51 (${t("taxSeason.countries.peru")})`}</option>
                    <option value="+1">{`+1 (${t("taxSeason.countries.usa")})`}</option>
                    <option value="+598">+598 (Uruguay)</option>
                    <option value="+58">+58 (Venezuela)</option>
                  </select>
                  <input
                    type="tel"
                    name="taxpayerPhone"
                    value={formData.taxpayerPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </label>

              {/* Spouse (optional) */}
              <label>
                {t("taxSeason.form.spouseName")}
                <input
                  type="text"
                  name="spouseName"
                  value={formData.spouseName}
                  onChange={handleChange}
                  placeholder={t("taxSeason.form.optionalPlaceholder")}
                />
              </label>

              <label>
                {t("taxSeason.form.spouseDob")}
                <input
                  type="date"
                  name="spouseDob"
                  value={formData.spouseDob}
                  onChange={handleChange}
                />
              </label>

              <label>
                {t("taxSeason.form.spousePhone")}
                <div className="phone-field">
                  <select
                    name="spouseCountryCode"
                    value={formData.spouseCountryCode}
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
                    <option value="+34">{`+34 (${t("taxSeason.countries.spain")})`}</option>
                    <option value="+502">+502 (Guatemala)</option>
                    <option value="+504">+504 (Honduras)</option>
                    <option value="+52">{`+52 (${t("taxSeason.countries.mexico")})`}</option>
                    <option value="+505">+505 (Nicaragua)</option>
                    <option value="+507">{`+507 (${t("taxSeason.countries.panama")})`}</option>
                    <option value="+595">+595 (Paraguay)</option>
                    <option value="+51">{`+51 (${t("taxSeason.countries.peru")})`}</option>
                    <option value="+1">{`+1 (${t("taxSeason.countries.usa")})`}</option>
                    <option value="+598">+598 (Uruguay)</option>
                    <option value="+58">+58 (Venezuela)</option>
                  </select>
                  <input
                    type="tel"
                    name="spousePhone"
                    value={formData.spousePhone}
                    onChange={handleChange}
                    placeholder={t("taxSeason.form.optionalPlaceholder")}
                  />
                </div>
              </label>

              {/* Dependents */}
              <label>
                {t("taxSeason.form.dependentsCount")}
                <input
                  type="number"
                  name="dependentsCount"
                  value={formData.dependentsCount}
                  onChange={handleChange}
                  min="0"
                  max="20"
                />
              </label>

              {formData.dependentsCount > 0 && (
                <div className="dependents-block">
                  <p className="paragraph"><strong>{t("taxSeason.form.dependentsDobHeading")}</strong></p>
                  {Array.from({ length: formData.dependentsCount }).map((_, idx) => (
                    <div className="dependent-row" key={idx}>
                      <label>
                        {t("taxSeason.form.dependentLabelPrefix")} #{idx + 1} {t("taxSeason.form.dependentLabelSuffix")}
                        <input
                          type="date"
                          value={formData.dependentsDob[idx] || ""}
                          onChange={(e) => handleDependentDobChange(idx, e.target.value)}
                          required
                        />
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {/* Message box */}
              <label>
                {t("taxSeason.form.message")}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder={t("taxSeason.form.messagePlaceholder")}
                />
              </label>

              <div className="enrollment-buttons">
                <button type="submit" className="button">{t("taxSeason.form.submit")}</button>
                <button
                  type="button"
                  className="button button--outline"
                  onClick={handleReset}
                >
                  {t("taxSeason.form.reset")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
