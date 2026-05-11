import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiArrowRight, FiCheckCircle, FiCpu } from "react-icons/fi";
import InteractiveGridCard from "@/components/ui/InteractiveGridCard";
import InteractivePageSurface from "@/components/ui/InteractivePageSurface";

export interface UtilityAction {
  href: string;
  label: string;
  icon?: ReactNode;
  external?: boolean;
  muted?: boolean;
}

export interface UtilityCard {
  eyebrow: string;
  title: string;
  body: string;
  points?: string[];
  actions?: UtilityAction[];
}

export interface PremiumUtilityPageProps {
  tone: CSSProperties;
  eyebrow: string;
  title: string;
  intro: string;
  icon: IconType;
  visualTitle: string;
  visualRows: string[];
  primaryAction?: UtilityAction;
  secondaryAction?: UtilityAction;
  cards: UtilityCard[];
  footerTitle?: string;
  footerBody?: string;
}

function UtilityLink({ action }: { action: UtilityAction }) {
  return (
    <Link
      href={action.href}
      target={action.external ? "_blank" : undefined}
      rel={action.external ? "noreferrer" : undefined}
      className={`subpage-card-cta ${action.muted ? "subpage-card-cta-muted" : ""}`}
    >
      {action.icon}
      {action.label}
      <FiArrowRight />
    </Link>
  );
}

function UtilityVisual({ title, rows }: { title: string; rows: string[] }) {
  return (
    <div className="subpage-ops-visual" aria-hidden>
      <div className="subpage-ops-visual__topbar">
        <span />
        <span />
        <span />
      </div>
      <div className="subpage-ops-visual__header">
        <div>
          <small>TRAXLE / DISTRIBUTION</small>
          <strong>{title}</strong>
        </div>
        <FiCpu />
      </div>
      <div className="subpage-ops-visual__graph">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="subpage-ops-visual__rows">
        {rows.slice(0, 3).map((row, index) => (
          <div key={row}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{row}</p>
            <strong>{index === 0 ? "Ready" : index === 1 ? "Sync" : "Verify"}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PremiumUtilityPage({
  tone,
  eyebrow,
  title,
  intro,
  icon: Icon,
  visualTitle,
  visualRows,
  primaryAction,
  secondaryAction,
  cards,
  footerTitle,
  footerBody,
}: PremiumUtilityPageProps) {
  return (
    <div className="premium-subpage-shell" style={tone}>
      <div className="premium-subpage-grid" aria-hidden />
      <div className="premium-subpage-orb premium-subpage-orb-a" aria-hidden />
      <div className="premium-subpage-orb premium-subpage-orb-b" aria-hidden />

      <div className="premium-subpage-container">
        <InteractivePageSurface className="premium-subpage-surface" intensity={3}>
          <section className="premium-subpage-hero">
            <div className="premium-subpage-hero__copy">
              <span className="premium-subpage-kicker">
                <Icon />
                {eyebrow}
              </span>
              <h1>{title}</h1>
              <p>{intro}</p>
              {(primaryAction || secondaryAction) && (
                <div className="premium-subpage-actions">
                  {primaryAction && <UtilityLink action={primaryAction} />}
                  {secondaryAction && <UtilityLink action={{ ...secondaryAction, muted: true }} />}
                </div>
              )}
            </div>
            <UtilityVisual title={visualTitle} rows={visualRows} />
          </section>

          <section className="subpage-block">
            <div className="subpage-block-heading">
              <span>TRAXLE CONTROL</span>
              <h2>{visualTitle}</h2>
            </div>
            <div className={cards.length === 2 ? "subpage-product-grid" : "subpage-section-grid"}>
              {cards.map((card, index) => (
                <InteractiveGridCard key={card.title} className="subpage-info-card" intensity={8}>
                  <span className="subpage-info-card__index">{String(index + 1).padStart(2, "0")}</span>
                  <p className="utility-card-eyebrow">{card.eyebrow}</p>
                  <h2>{card.title}</h2>
                  <p>{card.body}</p>
                  {card.points && (
                    <ul className="utility-point-list">
                      {card.points.map((point) => (
                        <li key={point}>
                          <FiCheckCircle />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                  {card.actions && (
                    <div className="utility-action-row">
                      {card.actions.map((action) => (
                        <UtilityLink key={`${card.title}-${action.label}`} action={action} />
                      ))}
                    </div>
                  )}
                </InteractiveGridCard>
              ))}
            </div>
          </section>

          {footerTitle && footerBody && (
            <section className="subpage-final-cta">
              <div>
                <span>OPERATIONS</span>
                <h2>{footerTitle}</h2>
                <p>{footerBody}</p>
              </div>
              {primaryAction && <UtilityLink action={primaryAction} />}
            </section>
          )}
        </InteractivePageSurface>
      </div>
    </div>
  );
}
