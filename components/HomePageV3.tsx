import { ArrowUpRight } from "lucide-react";
import HomeExperienceV2 from "@/components/HomeExperienceV2";
import ProjectIndex from "@/components/ProjectIndex";
import MaskedEditorial from "@/components/MaskedEditorial";
import SectionBridge from "@/components/SectionBridge";
import StudioMark from "@/components/StudioMark";
import { site } from "@/lib/site";

export default function HomePageV3() {
  const contactHref = site.email ? `mailto:${site.email}` : "#final-contact";

  return (
    <div className="homepage-v3">
      <HomeExperienceV2 />
      <ProjectIndex />
      <SectionBridge />
      <MaskedEditorial />

      <footer id="final-contact" className="contact v3-contact">
        <div className="contact-top">
          <span>08 / Contact</span>
          <span>{site.availability} · {site.year}</span>
        </div>

        <div className="contact-copy">
          <p>Have a site or an idea?</p>

          <a href={contactHref} data-cursor-label={site.email ? "EMAIL" : "HELLO"}>
            Let&apos;s build
            <br />
            something lasting.
            <ArrowUpRight size={64} strokeWidth={0.8} />
          </a>
        </div>

        <div className="contact-bottom">
          <span className="contact-brand">
            <StudioMark className="contact-mark" />
            {site.name}
          </span>
          <span>{site.descriptor}</span>
          <span>{site.location}</span>
        </div>

        {site.workingIdentity && (
          <p className="working-identity-note">
            Working identity — final firm name, logo and contact details can be replaced in lib/site.ts.
          </p>
        )}
      </footer>
    </div>
  );
}
