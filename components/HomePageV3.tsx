import { ArrowUpRight } from "lucide-react";
import HomeExperienceV2 from "@/components/HomeExperienceV2";
import ProjectIndex from "@/components/ProjectIndex";
import MaskedEditorial from "@/components/MaskedEditorial";
import SectionBridge from "@/components/SectionBridge";

export default function HomePageV3() {
  return (
    <div className="homepage-v3">
      <HomeExperienceV2 />
      <ProjectIndex />
      <SectionBridge />
      <MaskedEditorial />

      <footer id="final-contact" className="contact v3-contact">
        <div className="contact-top">
          <span>08 / Contact</span>
          <span>New commissions · 2026</span>
        </div>

        <div className="contact-copy">
          <p>Have a site or an idea?</p>

          <a href="#final-contact" data-cursor-label="HELLO">
            Let&apos;s build
            <br />
            something lasting.
            <ArrowUpRight size={64} strokeWidth={0.8} />
          </a>
        </div>

        <div className="contact-bottom">
          <span>STUDIO / 01</span>
          <span>Architecture · Interiors · Spatial Design</span>
          <span>Pakistan</span>
        </div>
      </footer>
    </div>
  );
}
