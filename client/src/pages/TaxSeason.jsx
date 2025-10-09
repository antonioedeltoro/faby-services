import "../styles/TaxSeason.css";
import { Helmet } from "react-helmet";
import { useState } from "react";

export default function TaxSeason() {
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
      `Consulta: Temporada de Impuestos ${currentYear}`
    );

    const depLines =
      dependentsCount > 0
        ? dependentsDob
            .map((d, i) => `Dependiente #${i + 1} - Fecha de nacimiento: ${d || "(sin fecha)"}`)
            .join("\n")
        : "N/A";

    const mailBody = encodeURIComponent(
      `Nueva solicitud de Temporada de Impuestos ${currentYear}:\n\n` +
        `Contribuyente\n` +
        `• Nombre completo: ${taxpayerName}\n` +
        `• Fecha de nacimiento: ${taxpayerDob}\n` +
        `• Teléfono: ${taxpayerCountryCode} ${taxpayerPhone}\n\n` +
        `Esposo(a) (opcional)\n` +
        `• Nombre: ${spouseName || "N/A"}\n` +
        `• Fecha de nacimiento: ${spouseDob || "N/A"}\n` +
        `• Teléfono: ${
          spousePhone ? `${spouseCountryCode} ${spousePhone}` : "N/A"
        }\n\n` +
        `Dependientes\n` +
        `• Número de dependientes: ${dependentsCount}\n` +
        `${depLines}\n\n` +
        `Mensaje:\n${message || "(sin mensaje)"}`
    );

    window.location.href = `mailto:${email}?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleReset = () => {
    setFormData(initialFormState);
  };

  return (
    <div className="page-container tax-season-page">
      <Helmet>
        <title>{`Temporada de Impuestos ${currentYear} | Faby Services Seguros y Contabilidad`}</title>
      </Helmet>

      <section className="tax-season-section">
        <div className="tax-content">
          <h1 className="heading-xl blue">{`Temporada de Impuestos ${currentYear}`}</h1>
          <p className="paragraph">Preparación de Impuestos con Confianza</p>
          <p className="paragraph">
            {`La Temporada de Impuestos ${currentYear} está en curso. Comparta sus datos básicos y nos pondremos en contacto para ayudarle a presentar correctamente—incluyendo extensiones hasta el 15 de octubre, si corresponde.`}
          </p>

          {/* ---------- Card wrapper ---------- */}
          <div className="card">
            <form className="enrollment-form" onSubmit={handleSubmit}>
              {/* Taxpayer */}
              <label>
                Nombre completo del contribuyente
                <input
                  type="text"
                  name="taxpayerName"
                  value={formData.taxpayerName}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Fecha de nacimiento del contribuyente
                <input
                  type="date"
                  name="taxpayerDob"
                  value={formData.taxpayerDob}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Teléfono del contribuyente
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
                    <option value="+34">+34 (España)</option>
                    <option value="+502">+502 (Guatemala)</option>
                    <option value="+504">+504 (Honduras)</option>
                    <option value="+52">+52 (México)</option>
                    <option value="+505">+505 (Nicaragua)</option>
                    <option value="+507">+507 (Panamá)</option>
                    <option value="+595">+595 (Paraguay)</option>
                    <option value="+51">+51 (Perú)</option>
                    <option value="+1">+1 (Estados Unidos)</option>
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
                Nombre del esposo(a) (opcional)
                <input
                  type="text"
                  name="spouseName"
                  value={formData.spouseName}
                  onChange={handleChange}
                  placeholder="(Opcional)"
                />
              </label>

              <label>
                Fecha de nacimiento del esposo(a) (opcional)
                <input
                  type="date"
                  name="spouseDob"
                  value={formData.spouseDob}
                  onChange={handleChange}
                />
              </label>

              <label>
                Teléfono del esposo(a) (opcional)
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
                    <option value="+34">+34 (España)</option>
                    <option value="+502">+502 (Guatemala)</option>
                    <option value="+504">+504 (Honduras)</option>
                    <option value="+52">+52 (México)</option>
                    <option value="+505">+505 (Nicaragua)</option>
                    <option value="+507">+507 (Panamá)</option>
                    <option value="+595">+595 (Paraguay)</option>
                    <option value="+51">+51 (Perú)</option>
                    <option value="+1">+1 (Estados Unidos)</option>
                    <option value="+598">+598 (Uruguay)</option>
                    <option value="+58">+58 (Venezuela)</option>
                  </select>
                  <input
                    type="tel"
                    name="spousePhone"
                    value={formData.spousePhone}
                    onChange={handleChange}
                    placeholder="(Opcional)"
                  />
                </div>
              </label>

              {/* Dependents */}
              <label>
                Número de dependientes
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
                  <p className="paragraph"><strong>Fechas de nacimiento de dependientes</strong></p>
                  {Array.from({ length: formData.dependentsCount }).map((_, idx) => (
                    <div className="dependent-row" key={idx}>
                      <label>
                        Dependiente #{idx + 1} — Fecha de nacimiento
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
                Mensaje
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Cuéntenos sobre su caso o situación..."
                />
              </label>

              <div className="enrollment-buttons">
                <button type="submit" className="button">Enviar</button>
                <button
                  type="button"
                  className="button button--outline"
                  onClick={handleReset}
                >
                  Borrar Formulario
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
