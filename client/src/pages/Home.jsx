import '../styles/Home.css';
import '../styles/PageStyles.css';
import FabyImage from '../assets/Faby.jpeg';
import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <div className="home-page">
      <Helmet>
        <title>Inicio | Faby Services</title>
      </Helmet>

      {/* HERO */}
      <section className="section hero-section centered">
        <div className="section-content">
          <h1 className="heading-xl text-center">Servicios Confiables de Impuestos y Consultoría Empresarial</h1>
          <p className="paragraph">
            En Faby Services, ayudamos a individuos, familias y pequeñas empresas a tomar el control de sus finanzas con claridad, confianza y compasión. Entendemos que manejar impuestos, seguros y preparación de documentos puede ser abrumador—especialmente cuando intenta hacerlo por su cuenta. Por eso hemos construido nuestros servicios en torno a una idea simple: apoyo personalizado y honesto en el que puede confiar.
          </p>
          <p className="paragraph">
            Nos acercamos a cada cliente con cuidado e intención. Ya sea que esté presentando impuestos por primera vez, asegurando un plan de salud para su familia o administrando las finanzas de su pequeña empresa, escuchamos atentamente sus necesidades y lo guiamos en cada detalle. Sin jerga confusa. Sin explicaciones apresuradas. Solo orientación clara y práctica adaptada a su situación.
          </p>
          <p className="paragraph">
            Nuestro equipo está profundamente arraigado en la comunidad a la que servimos. Muchos de nuestros clientes llegan por recomendaciones—de vecinos, amigos y familiares que confían en nosotros para ofrecer resultados. Tomamos esa confianza muy en serio. Por eso hacemos todo lo posible para garantizar que cada formulario sea preciso, cada fecha límite se cumpla y cada pregunta reciba una respuesta reflexiva.
          </p>
          <p className="paragraph">
            Más allá del papeleo, estamos aquí para abogar por su bienestar financiero. Nos mantenemos al día con los cambios en las leyes tributarias, las opciones de cobertura médica y los requisitos de cumplimiento, para que usted no tenga que hacerlo. Nuestro objetivo es asegurarnos de que no solo cumpla con sus obligaciones, sino que también aproveche las oportunidades—ahorrando dinero donde pueda y protegiendo lo que más importa.
          </p>
          <p className="paragraph">
            Cuando trabaja con Faby Services, no solo contrata a un preparador de impuestos o a un especialista en seguros. Está ganando un socio comprometido con su estabilidad y éxito a largo plazo. Sea cual sea la etapa de la vida en la que se encuentre o los desafíos que enfrente—estamos aquí para apoyarlo en cada paso del camino.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="section mission-section">
        <div className="section-content">
          <h2 className="heading-md">Empoderando Sus Finanzas, Asegurando Su Futuro</h2>
          <p className="paragraph">
            En Faby Services, nos especializamos en brindar apoyo claro y confiable en una variedad de servicios financieros y administrativos, incluyendo asesoría contable, preparación de impuestos y procesamiento de documentos oficiales. Ya sea que sea un individuo planificando el próximo año o una pequeña empresa enfrentando obligaciones complejas, ofrecemos la experiencia y estructura necesarias para avanzar con confianza.
          </p>
          <p className="paragraph">
            Nuestro enfoque está basado en la simplicidad y la integridad. Creemos que todos merecen acceso a una planificación financiera sólida—sin intimidación, confusión ni tarifas ocultas. Por eso nos tomamos el tiempo para explicarle sus opciones, ayudarle a tomar decisiones informadas y garantizar que sus documentos sean precisos y cumplan con los requisitos en cada paso del proceso.
          </p>
          <p className="paragraph">
            Sabemos que el estrés financiero no solo afecta su bolsillo—también impacta su tranquilidad, su capacidad de planificar el futuro y el bienestar de su familia. Nuestra misión es eliminar ese estrés convirtiéndonos en un socio confiable y con conocimiento en quien pueda confiar año tras año. Ya sea temporada de impuestos, inscripción abierta o tiempo de registrar un negocio, estamos aquí para guiarlo.
          </p>
          <p className="paragraph">
            La cobertura médica es otro pilar de nuestro apoyo. Muchos clientes llegan a nosotros sin saber por dónde empezar o abrumados por el proceso de inscripción. Simplificamos ese camino, ayudándole a encontrar y asegurar el mejor seguro posible según sus circunstancias. Porque la seguridad financiera no se trata solo de números—incluye la tranquilidad de saber que su salud y su futuro están protegidos.
          </p>
          <p className="paragraph">
            En Faby Services, el empoderamiento no es solo una palabra de moda—es nuestro compromiso. Estamos aquí para ayudarle a tomar el control de sus finanzas, comprender sus derechos y responsabilidades, y dar pasos seguros hacia un futuro más estable. Sin importar su origen o situación, lo recibimos con respeto, claridad y atención genuina.
          </p>
        </div>
      </section>

      {/* BELIEFS */}
      <section className="section beliefs-section">
        <div className="section-content">
          <h2 className="heading-md">En Qué Creemos</h2>
          <p className="paragraph">
            En Faby Services creemos que la educación financiera y el acceso a orientación confiable nunca deben ser un lujo—son un derecho fundamental. Cada persona y cada familia merecen sentirse seguras en sus decisiones financieras, entender los detalles y enfrentar la temporada de impuestos o los cambios importantes de la vida con claridad, no con confusión.
          </p>
          <p className="paragraph">
            Con demasiada frecuencia, las personas deben navegar sistemas complejos—como impuestos, seguros y documentación legal—sin una dirección clara. Hemos visto cómo esa incertidumbre genera estrés, retrasos y errores costosos. Nuestra creencia es simple: cuando las personas reciben apoyo con cuidado y claridad, toman mejores decisiones y mejoran su calidad de vida.
          </p>
          <p className="paragraph">
            También creemos en la preparación—no solo para lo esperado, sino para lo posible. La vida cambia rápidamente. Enfermedades, cambios de trabajo, familias en crecimiento o nuevos negocios traen nuevas responsabilidades financieras. Ayudamos a nuestros clientes a prepararse para estas transiciones con estrategias proactivas y soluciones personalizadas, asegurando que nunca los tomen por sorpresa.
          </p>
          <p className="paragraph">
            La confianza es la base de todo lo que hacemos. Entendemos que cuando nos entrega sus finanzas, documentos o preguntas, está depositando una gran fe en nuestras manos. Esa confianza nunca se da por sentada. Trabajamos arduamente para ganarla, mantenerla y reflejarla en la forma en que comunicamos, planificamos y entregamos resultados.
          </p>
          <p className="paragraph">
            En última instancia, creemos que la dignidad, la estabilidad y la tranquilidad comienzan con una base financiera sólida. Nuestro papel no es solo procesar papeleo—es fortalecer a nuestra comunidad haciendo que los servicios esenciales sean accesibles, comprensibles y humanos. Ese es el corazón de todo lo que hacemos.
          </p>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="section founder-section">
        <div className="founder-wrapper">
          <div className="founder-image-wrapper">
            <img src={FabyImage} alt="María Fabiola Bucio" className="founder-image" />
          </div>
          <div className="founder-text">
            <h2 className="heading-md">Conozca a Nuestra Fundadora</h2>
            <h3 className="heading-sm">María Fabiola Bucio</h3>
            <p className="paragraph">Fundadora de Faby Services</p>
            <blockquote className="paragraph">
              "Soy una orgullosa empresaria mexicana que inició este negocio como un sueño personal.
              Gracias a la confianza de mi comunidad, ese sueño ha crecido hasta convertirse en una empresa próspera
              comprometida con ofrecer más que servicios—ofrecemos una mano amiga. De principio a fin, estaré a su lado. Cuéntenos lo que necesita y lo haremos realidad."
            </blockquote>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials-section">
        <div className="section-content">
          <h2 className="heading-md">Lo Que Dicen Nuestros Clientes</h2>
          <p className="paragraph">
            En Faby Services, medimos el éxito no solo en números o transacciones, sino en la confianza y alivio que sienten nuestros clientes al salir por la puerta. Nuestros clientes nos buscan en busca de respuestas, orientación y claridad—y lo que se llevan es confianza, empoderamiento y tranquilidad.
          </p>
          <p className="paragraph">
            Hemos tenido el honor de trabajar con personas enfrentando situaciones fiscales complejas, dueños de pequeñas empresas lanzando nuevos proyectos y familias que buscan un futuro más seguro. Sin importar el desafío, nuestro compromiso sigue siendo el mismo: escuchar con atención, actuar con integridad y ofrecer soluciones que realmente funcionen.
          </p>
          <p className="paragraph">
            Nuestros clientes valoran constantemente nuestra transparencia y disposición para explicar las cosas con claridad—sin jerga ni juicios. Para muchos, es la primera vez que se sienten verdaderamente escuchados y apoyados en un entorno financiero. Esa confianza es lo que impulsa nuestro trabajo y define la experiencia que buscamos brindar cada vez.
          </p>
          <p className="paragraph">
            A lo largo de los años, nos hemos convertido en más que una oficina de impuestos o consultoría—somos una parte confiable de la vida de nuestros clientes. Regresan año tras año, no solo por los servicios, sino por la continuidad, familiaridad y atención genuina que han llegado a esperar. Sus recomendaciones, lealtad y palabras amables son el mejor testimonio de nuestra misión.
          </p>
          <p className="paragraph">
            Ya sea una nota de agradecimiento o una recomendación a un amigo, no tomamos los elogios a la ligera. Cada reseña positiva refleja la dedicación de nuestro equipo para poner a las personas primero—y nos recuerda por qué comenzamos este camino.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="section stats-section">
        <div className="section-content">
          <h2 className="heading-md">¿Por Qué Elegirnos?</h2>
          <p className="paragraph quote">
            Elegir un socio de servicios financieros es más que credenciales o servicios—se trata de confianza, consistencia y la seguridad de saber que alguien realmente lo respalda. En Faby Services, nos enorgullece construir relaciones basadas en la honestidad, el cuidado y una profunda comprensión de las necesidades de nuestros clientes.
          </p>
          <p className="paragraph quote">
            Desde el momento en que cruza nuestras puertas o nos llama, experimentará un tipo de servicio diferente—uno personal, no transaccional. Nos tomamos el tiempo para conocer su historia, sus metas y los desafíos que enfrenta. Ya sea preparando sus impuestos, lanzando un negocio o buscando orientación sobre seguros, nuestro equipo está aquí para hacerlo simple y sin estrés.
          </p>
          <p className="paragraph quote">
            Lo que nos distingue es nuestro compromiso con una orientación clara y práctica. Creemos en explicar las cosas sin jerga y ofrecer soluciones sin presión. Siempre sabrá lo que está pasando, por qué importa y cuáles son sus opciones. Es su futuro—nosotros solo estamos aquí para ayudarle a moldearlo.
          </p>
          <p className="paragraph quote">
            Nuestro equipo no solo tiene experiencia; está comprometido. Cada miembro aporta no solo conocimiento profesional sino también compasión y sentido de responsabilidad. Abordamos cada situación con cuidado, tratando su bienestar financiero como si fuera el nuestro.
          </p>
          <p className="paragraph quote">
            Como dijo uno de nuestros clientes: “Un negocio bien administrado le permite rastrear cada dólar y saber exactamente cuándo y dónde invertirlo.” No podríamos estar más de acuerdo. Por eso hemos construido una empresa diseñada para darle las herramientas, la visión y la confianza necesarias para tomar el control de su vida financiera—en cada paso del camino.
          </p>
        </div>
      </section>
    </div>
  );
}
