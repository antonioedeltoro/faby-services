import "../styles/TaxSeason.css"; // reuse form/card/typography via partials
import { Helmet } from "react-helmet";
import { useState } from "react";

export default function Appointments() {
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
    const subject = encodeURIComponent("Solicitud de Cita");
    const body = encodeURIComponent(
      `Nueva solicitud de cita:\n\n` +
      `Nombre: ${form.name}\n` +
      `Teléfono: ${form.countryCode} ${form.phone}\n` +
      `Fecha/Hora preferida: ${form.callAt || "(no especificado)"}\n\n` +
      `Mensaje:\n${form.message || "(sin mensaje)"}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleReset = () =>
    setForm({ name: "", countryCode: "+1", phone: "", callAt: "", message: "" });

  return (
    <div className="page-container tax-season-page">
      <Helmet>
        <title>Citas | Faby Services Seguros y Contabilidad</title>
      </Helmet>

      <section className="tax-season-section">
        <div className="tax-content">
          <h1 className="heading-xl blue">Citas</h1>
          <p className="paragraph">
            Envíe su solicitud y nos pondremos en contacto para confirmar la fecha y hora.
          </p>

          <div className="card">
            <form className="enrollment-form" onSubmit={handleSubmit}>
              <label>
                Nombre Completo
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Teléfono
                <div className="phone-field">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                  >
                    <option value="+1">+1 (Estados Unidos)</option>
                    <option value="+52">+52 (México)</option>
                    <option value="+503">+503 (El Salvador)</option>
                    <option value="+505">+505 (Nicaragua)</option>
                    <option value="+506">+506 (Costa Rica)</option>
                    <option value="+507">+507 (Panamá)</option>
                    <option value="+57">+57 (Colombia)</option>
                    <option value="+34">+34 (España)</option>
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
                Fecha y hora preferidas
                <input
                  type="datetime-local"
                  name="callAt"
                  value={form.callAt}
                  onChange={handleChange}
                />
              </label>

              <label>
                Mensaje
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Cuéntenos qué tipo de servicio necesita..."
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
