import Image from "next/image";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { SubscribeForm } from "@/components/SubscribeForm";
import { COPY, TOPIC_ICONS, isLang } from "@/lib/copy";

export const dynamicParams = false;

export default async function LaunchPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = COPY[lang];
  const otherLang = lang === "es" ? "en" : "es";

  return (
    <div className="vm-launch" lang={lang}>
      <header className="vm-header vm-header-light">
        <a
          href={`/${lang}`}
          className="vm-header-brand"
          aria-label={t.homeLabel}
        >
          <span className="vm-wordmark">
            vacamuerta<b>.co</b>
          </span>
        </a>
        <a
          className="vm-lang"
          href={`/${otherLang}`}
          hrefLang={otherLang}
          lang={otherLang}
        >
          <Icon name="globe" size={16} />
          <span>{t.otherLangLabel}</span>
        </a>
      </header>

      <main className="vm-launch-hero">
        <div className="vm-launch-in">
          <div className="vm-launch-copy">
            <p className="vm-kicker">
              <i />
              {t.kicker}
            </p>
            <h1 className="vm-launch-title">
              {t.titleBefore}
              <span className="vm-hl">{t.titleHighlight}</span>
              {t.titleAfter}
            </h1>
            <p className="vm-launch-lead">{t.lead}</p>
            <ul className="vm-topics" aria-label={t.topicsLabel}>
              {t.topics.map((label, i) => (
                <li key={label} className="vm-topic">
                  <span className="vm-topic-ic">
                    <Icon name={TOPIC_ICONS[i]} size={18} />
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
            <SubscribeForm lang={lang} copy={t} />
          </div>
          <div className="vm-launch-map">
            <Image
              src="/vaca-muerta-map.webp"
              alt={t.mapAlt}
              fill
              unoptimized
            />
          </div>
        </div>
      </main>

      <footer className="vm-legal">
        <p>
          {t.legalBefore}
          <a href="https://www.dibrand.co/" target="_blank" rel="noopener">
            {t.legalLink}
          </a>
          {t.legalAfter}
        </p>
      </footer>
    </div>
  );
}
