import '../styles/Services.css';
import Seo from "../components/Seo";
import { useLang } from "../context/LanguageContext";

export default function Services() {
  const { t } = useLang();

  return (
    <div className="page-container services-page">
      <Seo
        title={t("services.meta.title")}
        description={t("services.meta.description")}
        path="/services"
      />

      <section className="services-section">
        <div className="section-content">
          <h1 className="heading-xl blue">{t("services.title")}</h1>

          <div className="service-block">
            <h2 className="subheading">{t("services.items.healthInsurance.title")}</h2>
            <p className="paragraph">
              {t("services.items.healthInsurance.description")}
            </p>
          </div>

          <div className="service-block">
            <h2 className="subheading">{t("services.items.taxes.title")}</h2>
            <p className="paragraph">
              {t("services.items.taxes.description")}
            </p>
          </div>

          <div className="service-block">
            <h2 className="subheading">{t("services.items.accounting.title")}</h2>
            <p className="paragraph">
              {t("services.items.accounting.description")}
            </p>
          </div>

          <div className="service-block">
            <h2 className="subheading">{t("services.items.notary.title")}</h2>
            <p className="paragraph">
              {t("services.items.notary.description")}
            </p>
          </div>

          <div className="service-block">
            <h2 className="subheading">{t("services.items.training.title")}</h2>
            <p className="paragraph">
              {t("services.items.training.description")}
            </p>
          </div>

          <p className="paragraph cta">
            {t("services.cta")}
          </p>
        </div>
      </section>
    </div>
  );
}
