import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Image,
  Font,
} from "@react-pdf/renderer";
import React from "react";

// ─────────────────────────────────────────────────────────────
// Estilos del certificado
// ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FDFAF4",
    paddingHorizontal: 0,
    paddingVertical: 0,
    fontFamily: "Helvetica",
  },
  // Borde decorativo exterior
  borderOuter: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    bottom: 16,
    borderWidth: 3,
    borderColor: "#C9A84C",
    borderStyle: "solid",
  },
  borderInner: {
    position: "absolute",
    top: 22,
    left: 22,
    right: 22,
    bottom: 22,
    borderWidth: 1,
    borderColor: "#C9A84C",
    borderStyle: "solid",
  },
  // Franja header oscura
  header: {
    backgroundColor: "#1a2e24",
    paddingVertical: 28,
    paddingHorizontal: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerBrand: {
    color: "#C9A84C",
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.5,
  },
  headerSub: {
    color: "#8fa99c",
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 3,
    textTransform: "uppercase",
  },
  headerBadge: {
    backgroundColor: "#C9A84C",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  headerBadgeText: {
    color: "#1a2e24",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
  },
  // Contenido central
  body: {
    paddingHorizontal: 60,
    paddingTop: 36,
    paddingBottom: 24,
    flexGrow: 1,
    alignItems: "center",
  },
  certifiesLabel: {
    fontSize: 10,
    color: "#7a8a80",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  recipientName: {
    fontSize: 36,
    fontFamily: "Helvetica-Bold",
    color: "#1a2e24",
    textAlign: "center",
    marginBottom: 8,
  },
  recipientNameUnderline: {
    height: 2,
    width: 260,
    backgroundColor: "#C9A84C",
    marginBottom: 18,
  },
  completedText: {
    fontSize: 12,
    color: "#4a5a50",
    textAlign: "center",
    marginBottom: 6,
    lineHeight: 1.6,
  },
  courseTitle: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#1a2e24",
    textAlign: "center",
    marginBottom: 4,
    paddingHorizontal: 20,
  },
  companyRow: {
    fontSize: 11,
    color: "#6a7a70",
    textAlign: "center",
    marginBottom: 24,
  },
  dividerGold: {
    height: 1,
    width: 200,
    backgroundColor: "#C9A84C",
    marginVertical: 16,
  },
  // Score y fecha
  metaRow: {
    flexDirection: "row",
    gap: 40,
    marginTop: 8,
    marginBottom: 24,
  },
  metaBox: {
    alignItems: "center",
  },
  metaValue: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: "#1a7c4b",
  },
  metaLabel: {
    fontSize: 9,
    color: "#7a8a80",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginTop: 2,
  },
  // Firma
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 60,
    paddingBottom: 40,
    width: "100%",
  },
  signatureBox: {
    alignItems: "center",
    width: 180,
  },
  signatureLine: {
    height: 1,
    backgroundColor: "#1a2e24",
    width: 160,
    marginBottom: 4,
  },
  signatureLabel: {
    fontSize: 9,
    color: "#7a8a80",
    letterSpacing: 1,
  },
  // Número de certificado
  certNumber: {
    fontSize: 8,
    color: "#aab0ac",
    letterSpacing: 1,
  },
  signatureImg: {
    height: 48,
    width: 140,
    objectFit: "contain",
    marginBottom: 4,
  },
});

// ─────────────────────────────────────────────────────────────
// Parámetros de entrada
// ─────────────────────────────────────────────────────────────
export type CertificateInput = {
  assignmentId: string;
  employeeName: string;
  courseTitle: string;
  companyName: string;
  completedAt: string; // ISO date string
  score: number;
  passingScore: number;
  signatureImageUrl?: string; // URL del PDF de firma (si existe, se incrusta como imagen)
};

// ─────────────────────────────────────────────────────────────
// Documento React-PDF
// ─────────────────────────────────────────────────────────────
function CertificateDocument({
  assignmentId,
  employeeName,
  courseTitle,
  companyName,
  completedAt,
  score,
  signatureImageUrl,
}: CertificateInput) {
  const certNumber = assignmentId.slice(0, 8).toUpperCase();
  const dateFormatted = new Date(completedAt).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Document
      title={`Certificado — ${courseTitle}`}
      author="MEP Compliance"
      subject="Certificado de Aprobación"
      keywords="compliance, certificado, MEP"
    >
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Bordes decorativos */}
        <View style={styles.borderOuter} />
        <View style={styles.borderInner} />

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerBrand}>MEP Compliance</Text>
            <Text style={styles.headerSub}>Plataforma de Cursos Corporativos</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>CERTIFICADO DE APROBACIÓN</Text>
          </View>
        </View>

        {/* Cuerpo */}
        <View style={styles.body}>
          <Text style={styles.certifiesLabel}>Certifica que</Text>

          <Text style={styles.recipientName}>{employeeName}</Text>
          <View style={styles.recipientNameUnderline} />

          <Text style={styles.completedText}>ha completado y aprobado satisfactoriamente el curso</Text>
          <Text style={styles.courseTitle}>{courseTitle}</Text>

          <Text style={styles.companyRow}>
            en representación de <Text style={{ fontFamily: "Helvetica-Bold", color: "#1a2e24" }}>{companyName}</Text>
          </Text>

          <View style={styles.dividerGold} />

          {/* Score y fecha */}
          <View style={styles.metaRow}>
            <View style={styles.metaBox}>
              <Text style={styles.metaValue}>{score}%</Text>
              <Text style={styles.metaLabel}>Nota obtenida</Text>
            </View>
            <View style={styles.metaBox}>
              <Text style={[styles.metaValue, { fontSize: 18, paddingTop: 5, color: "#1a2e24" }]}>
                {dateFormatted}
              </Text>
              <Text style={styles.metaLabel}>Fecha de finalización</Text>
            </View>
          </View>
        </View>

        {/* Firma y número */}
        <View style={styles.signatureSection}>
          <Text style={styles.certNumber}>N° {certNumber}</Text>

          <View style={styles.signatureBox}>
            {signatureImageUrl ? (
              <Image src={signatureImageUrl} style={styles.signatureImg} />
            ) : (
              <View style={{ height: 48 }} />
            )}
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Director de Cumplimiento</Text>
            <Text style={[styles.signatureLabel, { marginTop: 2 }]}>MEP Compliance</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// ─────────────────────────────────────────────────────────────
// Exportación: genera el PDF como Buffer
// ─────────────────────────────────────────────────────────────
export async function generateCertificatePDF(input: CertificateInput): Promise<Buffer> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = React.createElement(CertificateDocument, input) as any;
  const instance = pdf(doc);
  const blob = await instance.toBlob();
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
