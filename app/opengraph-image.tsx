import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Architecture`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111111",
          color: "#f0eee8",
          padding: "56px 64px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>{site.name}</span>
          <span>{site.location} · {site.year}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 118,
              lineHeight: 0.86,
              letterSpacing: -8,
              fontWeight: 600,
            }}
          >
            FORM.
          </div>
          <div
            style={{
              fontSize: 118,
              lineHeight: 0.86,
              letterSpacing: -8,
              fontWeight: 600,
            }}
          >
            LIGHT.
          </div>
          <div
            style={{
              fontSize: 118,
              lineHeight: 0.86,
              letterSpacing: -8,
              fontWeight: 600,
              paddingLeft: 180,
            }}
          >
            PLACE.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            borderTop: "1px solid rgba(240,238,232,.35)",
            paddingTop: 18,
            fontSize: 18,
          }}
        >
          <span>{site.descriptor}</span>
          <span style={{ color: "#c8ff42" }}>Selected Works</span>
        </div>
      </div>
    ),
    size,
  );
}
