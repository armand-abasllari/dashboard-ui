// src/components/DashboardCard.tsx
import React from "react";

type DashboardCardProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function DashboardCard({
  title,
  description,
  children,
}: DashboardCardProps) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 18,
      }}
    >
      <h2 style={{ margin: 0, fontSize: 16 }}>{title}</h2>

      {description ? (
        <p style={{ marginTop: 10, color: "#9ca3af", whiteSpace: "pre-line" }}>
          {description}
        </p>
      ) : null}

      {children ? <div style={{ marginTop: 12 }}>{children}</div> : null}
    </div>
  );
}
