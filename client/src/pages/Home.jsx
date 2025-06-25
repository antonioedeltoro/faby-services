import '../styles/Home.css';
import '../styles/PageStyles.css';
import FabyImage from '../assets/Faby.jpeg';
import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <div className="home-page">
      <Helmet>
        <title>Home | Faby Services</title>
      </Helmet>

      {/* HERO */}
      <section className="section hero-section centered">
        <div className="section-content">
          <h1 className="heading-xl text-center">Trusted Tax & Business Consulting Services</h1>
          <p className="paragraph">
          At Faby Services, we help individuals, families, and small businesses take control of their finances with clarity, confidence, and compassion. We understand that navigating taxes, insurance, and document preparation can feel overwhelming—especially when you’re trying to do it all on your own. That’s why we’ve built our services around one simple idea: personalized, honest support you can rely on.
          </p>
          <p className="paragraph">
          We approach every client relationship with care and intention. Whether you’re filing taxes for the first time, securing health insurance for your family, or managing the financial operations of your small business, we listen carefully to your needs and walk you through every detail. No confusing jargon. No rushed explanations. Just clear, practical guidance tailored to your specific situation.
          </p>
          <p className="paragraph">
          Our team is deeply rooted in the community we serve. Many of our clients come to us through word of mouth—referrals from neighbors, friends, and family members who trust us to deliver results. We take that trust seriously. It’s why we go the extra mile to ensure every form is accurate, every deadline is met, and every question gets a thoughtful answer.
          </p>
          <p className="paragraph">
          Beyond the paperwork, we’re here to advocate for your financial wellbeing. We stay current on changes to tax laws, health coverage options, and compliance requirements so you don’t have to. Our goal is to make sure you're not only meeting your obligations, but also maximizing opportunities—saving money where you can and protecting what matters most.
          </p>
          <p className="paragraph">
          When you work with Faby Services, you’re not just hiring a tax preparer or insurance specialist. You’re gaining a partner who’s committed to your long-term stability and success. Whatever stage of life you’re in, whatever challenges you’re facing—we’re here to support you, every step of the way.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="section mission-section">
        <div className="section-content">
          <h2 className="heading-md">Empowering Your Finances, Securing Your Future</h2>
          <p className="paragraph">
            At Faby Services, we specialize in providing clear, trustworthy support across a range of financial and administrative services—including accounting guidance, tax preparation, and official document processing. Whether you’re an individual planning for the year ahead or a small business navigating complex obligations, we offer the expertise and structure you need to move forward with confidence.
          </p>
          <p className="paragraph">
            Our approach is rooted in simplicity and integrity. We believe that everyone deserves access to sound financial planning—without the intimidation, confusion, or hidden fees. That’s why we take the time to explain your options, help you make informed decisions, and ensure your documents are accurate and compliant every step of the way.
          </p>
          <p className="paragraph">
            We know that financial stress doesn’t just affect your wallet—it impacts your peace of mind, your ability to plan for the future, and the wellbeing of your family. Our mission is to remove that stress by becoming a reliable, knowledgeable partner you can count on year after year. Whether it’s tax season, open enrollment, or time to register a business, we’re here to guide you through it.
          </p>
          <p className="paragraph">
            Health coverage is another pillar of our support. Many clients come to us unsure of where to begin or overwhelmed by the enrollment process. We simplify that journey, helping you find and secure the best possible insurance for your circumstances. Because financial security doesn’t stop at numbers—it includes the security of knowing your health and future are protected.
          </p>
          <p className="paragraph">
            At Faby Services, empowerment isn’t a buzzword—it’s our commitment. We’re here to help you gain control over your finances, understand your rights and responsibilities, and take confident steps toward a more secure future. No matter your background or situation, we meet you with respect, clarity, and genuine care.
          </p>
        </div>
      </section>

      {/* BELIEFS */}
      <section className="section beliefs-section">
        <div className="section-content">
          <h2 className="heading-md">What We Believe</h2>
          <p className="paragraph">
            At Faby Services, we believe that financial literacy and access to trustworthy guidance should never be a luxury—they're a fundamental right. Every individual and every family deserves to feel secure in their financial decisions, to understand the fine print, and to face tax season or major life changes with clarity, not confusion.
          </p>
          <p className="paragraph">
            Too often, people are left to navigate complex systems—like taxes, insurance, and legal documentation—without clear direction. We’ve seen how that uncertainty creates stress, delays, and costly mistakes. Our belief is simple: when people are supported with care and clarity, they make better decisions, and their lives improve.
          </p>
          <p className="paragraph">
            We also believe in preparation—not just for what's expected, but for what’s possible. Life changes quickly. Illness, job changes, growing families, or new businesses all come with new financial responsibilities. We help our clients prepare for these transitions with proactive strategies and personalized solutions, ensuring they’re never caught off guard.
          </p>
          <p className="paragraph">
            Trust is the foundation of everything we do. We understand that when you come to us with your finances, your documents, or your questions, you're putting a great deal of faith in our hands. That trust is never taken for granted. We work hard to earn it, keep it, and reflect it in the way we communicate, plan, and deliver results.
          </p>
          <p className="paragraph">
            Ultimately, we believe that dignity, stability, and peace of mind begin with a solid financial foundation. Our role is not just to process paperwork—it’s to uplift our community by making essential services accessible, understandable, and human. That’s the heart of everything we do.
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
            <h2 className="heading-md">Meet Our Founder</h2>
            <h3 className="heading-sm">María Fabiola Bucio</h3>
            <p className="paragraph">Founder of Faby Services</p>
            <blockquote className="paragraph">
              "I'm a proud Mexican entrepreneur who started this business as a personal dream.
              Thanks to the trust of my community, that dream has grown into a thriving company
              committed to providing more than just services—we offer a helping hand. From start to
              finish, I’ll be by your side. Tell us what you need, and we’ll make it happen."
            </blockquote>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials-section">
        <div className="section-content">
          <h2 className="heading-md">What Our Clients Say</h2>
          <p className="paragraph">
            At Faby Services, we measure success not just in numbers or transactions, but in the confidence and relief our clients feel when they walk out the door. Our clients come to us seeking answers, guidance, and clarity—and what they leave with is trust, empowerment, and peace of mind.
          </p>
          <p className="paragraph">
            We’ve had the honor of working with individuals navigating complex tax situations, small business owners launching new ventures, and families planning for a more secure future. No matter the challenge, our commitment remains the same: listen closely, act with integrity, and deliver solutions that actually work.
          </p>
          <p className="paragraph">
            Clients consistently share how much they value our transparency and our willingness to explain things clearly—without jargon or judgment. For many, it’s the first time they’ve felt truly heard and supported in a financial setting. That trust is what fuels our work and defines the experience we aim to provide every single time.
          </p>
          <p className="paragraph">
            Over the years, we’ve become more than just a tax or consulting office—we’ve become a trusted part of our clients’ lives. They come back year after year, not just for services, but for the continuity, familiarity, and genuine care they’ve come to expect. Their referrals, loyalty, and kind words are the greatest endorsements of our mission.
          </p>
          <p className="paragraph">
            Whether it’s a heartfelt thank-you note or a referral to a friend, we don’t take the praise lightly. Every positive review is a reflection of our team’s dedication to putting people first—and a reminder of why we started this journey in the first place.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="section stats-section">
        <div className="section-content">
          <h2 className="heading-md">Why Choose Us?</h2>
          <p className="paragraph quote">
            Choosing a financial services partner is about more than credentials or offerings—it’s about trust, consistency, and the feeling that someone genuinely has your back. At Faby Services, we pride ourselves on building relationships rooted in honesty, care, and a deep understanding of our clients’ needs.
          </p>
          <p className="paragraph quote">
            From the moment you walk through our doors or give us a call, you’ll experience a different kind of service—one that’s personal, not transactional. We take the time to get to know your story, your goals, and the challenges you face. Whether you’re preparing your taxes, launching a business, or seeking guidance on insurance, our team is here to make things simple and stress-free.
          </p>
          <p className="paragraph quote">
            What sets us apart is our commitment to clear, practical guidance. We believe in explaining things without jargon and offering solutions without pressure. You’ll always know what’s happening, why it matters, and what your options are. It’s your future—we’re just here to help you shape it.
          </p>
          <p className="paragraph quote">
            Our team isn’t just experienced; we’re invested. Every staff member brings not only professional knowledge but also compassion and a sense of responsibility. We approach every situation with care, treating your financial wellbeing as if it were our own.
          </p>
          <p className="paragraph quote">
            As one of our clients once said, “A well-managed business allows you to track every dollar and know exactly when and where to invest it.” We couldn’t agree more. That’s why we’ve built a firm designed to give you the tools, insight, and confidence to take control of your financial life—every step of the way.
          </p>
        </div>
      </section>
    </div>
  );
}
