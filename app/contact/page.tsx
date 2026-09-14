import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import InquiryForm from "@/components/InquiryForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start an architecture or interior architecture project with the studio.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="inner-page contact-page">
      <SiteHeader />

      <section className="contact-page-hero">
        <div className="inner-hero-top">
          <span>Contact / New project</span>
          <span>{site.availability}</span>
        </div>

        <div className="contact-page-title">
          <p>Have a site, brief or early idea?</p>
          <h1>
            START WITH
            <br />
            A CONVERSATION.
          </h1>
        </div>
      </section>

      <section className="contact-page-body">
        <div className="contact-page-sidebar">
          <div>
            <span>Studio</span>
            <strong>{site.name}</strong>
          </div>

          <div>
            <span>Location</span>
            <strong>{site.location}</strong>
          </div>

          {site.email && (
            <div>
              <span>Email</span>
              <a href={"mailto:" + site.email}>{site.email}</a>
            </div>
          )}

          {site.phone && (
            <div>
              <span>Phone</span>
              <a href={"tel:" + site.phone}>{site.phone}</a>
            </div>
          )}

          {site.whatsapp && (
            <div>
              <span>WhatsApp</span>
              <a
                href={"https://wa.me/" + site.whatsapp.replace(/\D/g, "")}
                target="_blank"
                rel="noreferrer"
              >
                Start a conversation
              </a>
            </div>
          )}

          {site.address && (
            <div>
              <span>Address</span>
              <strong>{site.address}</strong>
            </div>
          )}
        </div>

        <InquiryForm />
      </section>
    </main>
  );
}
