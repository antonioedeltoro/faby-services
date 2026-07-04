import { useEffect, useRef } from 'react';
import '../styles/Contact.css';
import { Helmet } from 'react-helmet';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // local CSS import (Option 1)
import { useLang } from "../context/LanguageContext";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';

const ADDRESS_TEXT = '10920 Fenton Rd, Moreno Valley, CA 92557';

// Office Location Coordinates 
const LOCATION = { lng: -117.2927, lat: 33.9396, zoom: 15, };

export default function Contact() {
  const { t } = useLang();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // Decide which maps app URL to open
  const getPreferredMapsURL = () => {
    const ua = navigator.userAgent || '';
    const isAndroid = /Android/.test(ua);
    const isIOS = /iPad|iPhone|iPod|Macintosh/.test(ua) && !/Android/.test(ua);

    if (isAndroid) return `geo:0,0?q=${encodeURIComponent(ADDRESS_TEXT)}`;
    if (isIOS) return `https://maps.apple.com/?q=${encodeURIComponent(ADDRESS_TEXT)}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_TEXT)}`;
  };

  // Fallback: keep the box clickable even if Mapbox fails to init
  const openMaps = () => {
    window.location.href = getPreferredMapsURL();
  };

  // Initialize Mapbox (deferred to next frame), force resize after load
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;
    if (!mapboxgl.accessToken) return; // graceful: box remains clickable

    let cleanup = () => {};
    const raf = requestAnimationFrame(() => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [LOCATION.lng, LOCATION.lat],
        zoom: LOCATION.zoom,
        cooperativeGestures: true,
      });
      mapRef.current = map;

      new mapboxgl.Marker({ color: '#004d40' })
        .setLngLat([LOCATION.lng, LOCATION.lat])
        .addTo(map);

      // Open maps app when user clicks the map
      map.on('click', openMaps);

      // Fix Safari/Grid timing: ensure the canvas sizes correctly
      map.on('load', () => {
        map.resize();
        setTimeout(() => map.resize(), 100);
      });

      // Keep sized on window/layout changes
      const onWinResize = () => map.resize();
      window.addEventListener('resize', onWinResize);

      // Extra robustness: resize when the container's box size changes
      let ro;
      if ('ResizeObserver' in window && mapContainerRef.current) {
        ro = new ResizeObserver(() => map.resize());
        ro.observe(mapContainerRef.current);
      }

      map.on('error', (e) => {
        // Surface any Mapbox errors in console during dev
        // eslint-disable-next-line no-console
        console.error('Mapbox error event:', e?.error || e);
      });

      cleanup = () => {
        window.removeEventListener('resize', onWinResize);
        if (ro) ro.disconnect();
        map.remove();
      };
    });

    return () => {
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, []);

  return (
    <div className="page-container contact-page">
      <Helmet>
        <title>{t("contact.meta.title")}</title>
      </Helmet>

      <section className="contact-section">
        <div className="section-content">
          <div className="contact-grid">
            {/* LEFT COLUMN — existing content */}
            <div className="contact-left">
              <h1 className="heading-xl blue">{t("contact.heading")}</h1>
              <p className="paragraph">{t("contact.intro")}</p>

              <div className="contact-details">
                <p className="paragraph"><strong>{t("contact.details.phoneLabel")}</strong> (424) 249-0927 / (424) 426-9893</p>
                <p className="paragraph"><strong>{t("contact.details.emailLabel")}</strong> fabymultiservicios@gmail.com</p>
                <p className="paragraph"><strong>{t("contact.details.locationLabel")}</strong> {ADDRESS_TEXT}</p>
              </div>

              <p className="paragraph cta">
                {t("contact.cta")}
              </p>
            </div>

            {/* RIGHT COLUMN — map only; clickable as fallback */}
            <div
              ref={mapContainerRef}
              className="mapbox-container"
              onClick={openMaps}
              role="button"
              aria-label={t("contact.mapAria")}
              title={t("contact.mapAria")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
