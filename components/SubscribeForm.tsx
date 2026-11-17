"use client";

import { useId, useState, type FormEvent } from "react";
import { Icon } from "./Icon";
import type { Copy, Lang } from "@/lib/copy";

type Status = "idle" | "sending" | "sent" | "invalid" | "error";

type Props = {
  lang: Lang;
  copy: Pick<
    Copy,
    | "subscribeLabel"
    | "placeholder"
    | "button"
    | "hint"
    | "hintSent"
    | "errorInvalid"
    | "errorServer"
  >;
};

export function SubscribeForm({ lang, copy }: Props) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    // "company" es un honeypot: un usuario real nunca lo completa.
    const company = new FormData(e.currentTarget).get("company");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang, company }),
      });
      if (res.ok) setStatus("sent");
      else setStatus(res.status === 400 ? "invalid" : "error");
    } catch {
      setStatus("error");
    }
  }

  const hintId = `${id}-hint`;
  const errorText =
    status === "invalid"
      ? copy.errorInvalid
      : status === "error"
        ? copy.errorServer
        : null;

  return (
    <form className="vm-subscribe" onSubmit={onSubmit}>
      <label className="vm-subscribe-label" htmlFor={id}>
        {copy.subscribeLabel}
      </label>
      <div className="vm-subscribe-bar">
        <Icon name="mail" size={20} />
        <input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder={copy.placeholder}
          value={email}
          aria-describedby={hintId}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Honeypot, oculto para personas y lectores de pantalla */}
        <input
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
        />
        <button
          type="submit"
          className="vm-btn vm-btn-accent"
          disabled={status === "sending"}
        >
          {copy.button}
        </button>
      </div>
      <div id={hintId} aria-live="polite">
        {errorText ? (
          <div className="vm-error" role="alert">
            <svg
              width={14}
              height={14}
              viewBox="0 0 14 14"
              aria-hidden="true"
              focusable="false"
            >
              <circle
                cx={7}
                cy={7}
                r={6}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
              />
              <path
                d="M7 4v3.6M7 9.6v.1"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            </svg>
            <span>{errorText}</span>
          </div>
        ) : (
          <div className="vm-hint">
            {status === "sent" ? copy.hintSent : copy.hint}
          </div>
        )}
      </div>
    </form>
  );
}
