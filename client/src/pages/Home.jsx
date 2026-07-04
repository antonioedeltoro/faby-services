import '../styles/Home.css';
import '../styles/PageStyles.css';
import FabyImage from '../assets/Faby.jpeg';
import { Helmet } from 'react-helmet';
import { useLang } from "../context/LanguageContext";

export default function Home() {
  const { t } = useLang();

  return (
    <div className="home-page">
      <Helmet>
        <title>{t("home.meta.title")}</title>
      </Helmet>

      {/* HERO */}
      <section className="section hero-section centered">
        <div className="section-content">
          <h1 className="heading-xl text-center">{t("home.hero.title")}</h1>
          <p className="paragraph">
            {t("home.hero.p1")}
          </p>
          <p className="paragraph">
            {t("home.hero.p2")}
          </p>
          <p className="paragraph">
            {t("home.hero.p3")}
          </p>
          <p className="paragraph">
            {t("home.hero.p4")}
          </p>
          <p className="paragraph">
            {t("home.hero.p5")}
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="section mission-section">
        <div className="section-content">
          <h2 className="heading-md">{t("home.mission.title")}</h2>
          <p className="paragraph">
            {t("home.mission.p1")}
          </p>
          <p className="paragraph">
            {t("home.mission.p2")}
          </p>
          <p className="paragraph">
            {t("home.mission.p3")}
          </p>
          <p className="paragraph">
            {t("home.mission.p4")}
          </p>
          <p className="paragraph">
            {t("home.mission.p5")}
          </p>
        </div>
      </section>

      {/* BELIEFS */}
      <section className="section beliefs-section">
        <div className="section-content">
          <h2 className="heading-md">{t("home.beliefs.title")}</h2>
          <p className="paragraph">
            {t("home.beliefs.p1")}
          </p>
          <p className="paragraph">
            {t("home.beliefs.p2")}
          </p>
          <p className="paragraph">
            {t("home.beliefs.p3")}
          </p>
          <p className="paragraph">
            {t("home.beliefs.p4")}
          </p>
          <p className="paragraph">
            {t("home.beliefs.p5")}
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
            <h2 className="heading-md">{t("home.founder.title")}</h2>
            <h3 className="heading-sm">María Fabiola Bucio</h3>
            <p className="paragraph">{t("home.founder.role")}</p>
            <blockquote className="paragraph">
              {t("home.founder.quote")}
            </blockquote>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials-section">
        <div className="section-content">
          <h2 className="heading-md">{t("home.testimonials.title")}</h2>
          <p className="paragraph">
            {t("home.testimonials.p1")}
          </p>
          <p className="paragraph">
            {t("home.testimonials.p2")}
          </p>
          <p className="paragraph">
            {t("home.testimonials.p3")}
          </p>
          <p className="paragraph">
            {t("home.testimonials.p4")}
          </p>
          <p className="paragraph">
            {t("home.testimonials.p5")}
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="section stats-section">
        <div className="section-content">
          <h2 className="heading-md">{t("home.stats.title")}</h2>
          <p className="paragraph quote">
            {t("home.stats.p1")}
          </p>
          <p className="paragraph quote">
            {t("home.stats.p2")}
          </p>
          <p className="paragraph quote">
            {t("home.stats.p3")}
          </p>
          <p className="paragraph quote">
            {t("home.stats.p4")}
          </p>
          <p className="paragraph quote">
            {t("home.stats.p5")}
          </p>
        </div>
      </section>
    </div>
  );
}
