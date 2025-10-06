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
        <title>{`Inscripción Abierta ${currentYear} | Faby Services Seguros y Contabilidad`}</title>
      </Helmet>

      <section className="open-enrollment-section">
        <div className="enrollment-content">
          <h1 className="heading-xl blue">{`Inscripción Abierta ${currentYear}`}</h1>
          <p className="paragraph">Inscríbase con Confianza</p>
          <p className="paragraph">
            {`La Inscripción Abierta ${currentYear} ya está aquí. Le ayudaremos a seleccionar entre los mejores planes de seguro médico del mercado.`}
          </p>
          <p className="paragraph">¿Listo para inscribirse?</p>

          <ul className="enrollment-list">
            <li>Llámenos al (424) 249-0927 o (424) 426-9893</li>
            <li>
              O complete nuestro formulario de contacto en línea, y lo
              llamaremos cuando le sea conveniente.
            </li>
            <li>Reciba orientación experta en cada paso del proceso.</li>
            <li>Encontraremos la cobertura adecuada para usted.</li>
          </ul>

          {/* ---------- Card wrapper ---------- */}
          <div className="card">
            <form className="enrollment-form" onSubmit={handleSubmit}>
              <label>
                Nombre Completo
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Número de Teléfono
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </label>

              <label>
                Asunto
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un tema</option>
                  <option value="Bookkeeping">Contabilidad</option>
                  <option value="Training Courses">Cursos de Capacitación</option>
                  <option value="Taxes">Impuestos</option>
                  <option value="Business Consulting Services">
                    Servicios de Consultoría Empresarial
                  </option>
                  <option value="Covered California">Covered California</option>
                  <option value="Medicare">Medicare</option>
                </select>
              </label>

              <label>
                Fecha y Hora para Devolver la Llamada
                <input
                  type="datetime-local"
                  name="callAt"
                  value={formData.callAt}
                  onChange={handleChange}
                />
              </label>

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
                <button type="submit" className="button">
                  Enviar
                </button>
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
