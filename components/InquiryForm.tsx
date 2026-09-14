"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { site } from "@/lib/site";

export default function InquiryForm() {
  const [copied, setCopied] = useState(false);

  const buildBrief = (form: HTMLFormElement) => {
    const data = new FormData(form);
    return [
      "Architecture project inquiry",
      "",
      "Name: " + String(data.get("name") || ""),
      "Email: " + String(data.get("email") || ""),
      "Project type: " + String(data.get("projectType") || ""),
      "Location: " + String(data.get("location") || ""),
      "Approx. area / scale: " + String(data.get("scale") || ""),
      "Timeline: " + String(data.get("timeline") || ""),
      "",
      "Project brief:",
      String(data.get("brief") || ""),
    ].join("\n");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const brief = buildBrief(event.currentTarget);

    if (site.email) {
      const subject = encodeURIComponent("New architecture project inquiry");
      const body = encodeURIComponent(brief);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }

    const copyBrief = async () => {
      try {
        await navigator.clipboard.writeText(brief);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = brief;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    };

    void copyBrief();
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="inquiry-grid">
        <label>
          <span>Name</span>
          <input name="name" type="text" required placeholder="Your name" />
        </label>

        <label>
          <span>Email</span>
          <input name="email" type="email" required placeholder="you@example.com" />
        </label>

        <label>
          <span>Project type</span>
          <select name="projectType" defaultValue="">
            <option value="" disabled>Select</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Hospitality</option>
            <option>Interior Architecture</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          <span>Location</span>
          <input name="location" type="text" placeholder="City / site" />
        </label>

        <label>
          <span>Approx. area / scale</span>
          <input name="scale" type="text" placeholder="e.g. 5,000 ft²" />
        </label>

        <label>
          <span>Timeline</span>
          <input name="timeline" type="text" placeholder="Target start / completion" />
        </label>
      </div>

      <label className="inquiry-brief">
        <span>Project brief</span>
        <textarea
          name="brief"
          required
          rows={6}
          placeholder="Tell us about the site, program, goals and what you want the project to feel like."
        />
      </label>

      <div className="inquiry-submit-row">
        <p>
          {site.email
            ? "Submitting opens your email app with the project brief prepared."
            : "Final studio email is not configured yet. Submit will copy the complete brief so it is not lost."}
        </p>

        <button type="submit" data-cursor-label="SEND">
          {site.email ? (
            <>
              Prepare email
              <ArrowUpRight size={19} strokeWidth={1.2} />
            </>
          ) : copied ? (
            <>
              Brief copied
              <Check size={19} strokeWidth={1.2} />
            </>
          ) : (
            <>
              Copy project brief
              <Copy size={19} strokeWidth={1.2} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
