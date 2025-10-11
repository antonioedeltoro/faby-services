import '../styles/Services.css';
import { Helmet } from 'react-helmet';

export default function Services() {
  return (
    <div className="page-container services-page">
      <Helmet>
        <title>Servicios | Faby Services Seguros y Contabilidad</title>
      </Helmet>

      <section className="services-section">
        <div className="section-content">
          <h1 className="heading-xl blue">Explore Nuestros Servicios</h1>

          <div className="service-block">
            <h2 className="subheading">Seguro Médico</h2>
            <p className="paragraph">
              Proteja a usted y a sus seres queridos. Ofrecemos una gama completa de opciones de cobertura a través de Covered California y otros proveedores confiables.
            </p>
          </div>

          <div className="service-block">
            <h2 className="subheading">Servicios de Impuestos</h2>
            <p className="paragraph">
              Ya sea que presente impuestos personales o corporativos, nuestros asesores experimentados garantizan presentaciones precisas, cumplidas y a tiempo.
            </p>
          </div>

          <div className="service-block">
            <h2 className="subheading">Contabilidad</h2>
            <p className="paragraph">
              Permítanos encargarnos de la contabilidad, nómina, cuentas por cobrar/pagar y registros fiscales—para que usted pueda concentrarse en administrar su negocio.
            </p>
          </div>

          <div className="service-block">
            <h2 className="subheading">Notary Public</h2>
            <p className="paragraph">
              Ofrecemos servicios notariales confiables y rápidos para todo tipo de documentos legales y comerciales. Garantizamos precisión, confidencialidad y cumplimiento con los requisitos estatales vigentes.
            </p>
          </div>

          <div className="service-block">
            <h2 className="subheading">Cursos de Capacitación</h2>
            <p className="paragraph">
              Manténgase actualizado con lo más reciente en leyes federales y fiscales. No se requiere experiencia previa—solo el deseo de aprender y crecer.
            </p>
          </div>

          <p className="paragraph cta">
            Para obtener ayuda experta y resultados reales para su negocio—comencemos hoy.
          </p>
        </div>
      </section>
    </div>
  );
}
