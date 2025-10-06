import '../styles/Contact.css';
import { Helmet } from 'react-helmet';

export default function Contact() {
  return (
    <div className="page-container contact-page">
      <Helmet>
        <title>Contacto | Faby Services Seguros y Contabilidad</title>
      </Helmet>

      <section className="contact-section">
        <div className="section-content">
          <h1 className="heading-xl blue">Contáctenos</h1>
          <p className="paragraph">¿Tiene preguntas? Estamos aquí para ayudarle.</p>

          <div className="contact-details">
            <p className="paragraph"><strong>Teléfono:</strong> (424) 249-0927 / (424) 426-9893</p>
            <p className="paragraph"><strong>Correo electrónico:</strong> fabymultiservicios@gmail.com</p>
            <p className="paragraph"><strong>Ubicación:</strong> 14103 Jefferson Ave Hawthorne, CA 90250</p>
          </div>

          <p className="paragraph cta">
            ¿Prefiere hablar en persona? Llámenos o visítenos durante el horario de atención.
          </p>
        </div>
      </section>
    </div>
  );
}
