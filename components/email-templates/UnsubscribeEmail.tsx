import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Button,
  Hr,
  Img,
  Text,
  Link,
  Heading,
  Row,
  Column,
} from "@react-email/components";

interface UnsubscribeEmailProps {
  email: string;
  resubscribeToken: string;
}

const UnsubscribeEmail: React.FC<UnsubscribeEmailProps> = ({
  email,
  resubscribeToken,
}) => {
  // Create the dynamic resubscribe URL
  const resubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://ethmar.xyz"}/resubscribe?email=${encodeURIComponent(email)}&token=${encodeURIComponent(resubscribeToken)}`;

  return (
    <Html lang="ar" dir="rtl">
      <Head>
        <title>إثمار - تأكيد إلغاء الاشتراك</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Body
        style={
          {
            margin: "0",
            padding: "0",
            fontFamily: "Arial, 'Tajawal', 'Cairo', sans-serif",
            direction: "rtl",
            backgroundColor: "#f3f4f6",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          } as React.CSSProperties
        }
      >
        <Container
          style={{
            backgroundColor: "#f3f4f6",
            padding: "24px 12px",
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Section
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
              marginBottom: "24px",
            }}
          >
            {/* Header with Ethmar Logo */}
            <Section
              style={{
                backgroundColor: "#2C953F",
                backgroundImage: "linear-gradient(135deg, #185023, #2C953F)",
                padding: "48px 24px",
                textAlign: "center",
                color: "#ffffff",
                position: "relative",
              }}
            >
              <Img
                src="https://nqveldgyeonkhrsrsjbn.supabase.co/storage/v1/object/public/companies/ethmarlogoS.svg"
                alt="شعار اثمار"
                width="140"
                height="100"
                style={{
                  display: "block",
                  margin: "0 auto 5px",
                }}
              />
              <Heading
                as="h2"
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  margin: "16px 0",
                  color: "#ffffff",
                  fontFamily: "Arial, 'Tajawal', sans-serif",
                }}
              >
                تم إلغاء الاشتراك بنجاح
              </Heading>
              <div
                style={{
                  width: "96px",
                  height: "4px",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  margin: "16px auto",
                  borderRadius: "2px",
                }}
              ></div>
            </Section>

            {/* Main Content */}
            <Section
              style={{
                padding: "32px 24px",
                backgroundColor: "#ffffff",
              }}
            >
              <Text
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "#1f2937",
                  textAlign: "center",
                  marginBottom: "24px",
                  fontFamily: "Arial, 'Cairo', sans-serif",
                }}
              >
                نأسف لمغادرتك
              </Text>

              <Text
                style={{
                  color: "#4b5563",
                  marginBottom: "32px",
                  lineHeight: "1.6",
                  fontSize: "16px",
                  fontFamily: "Arial, 'Cairo', sans-serif",
                }}
              >
                لقد تم إلغاء اشتراكك في النشرة الإخبارية لبرنامج إثمار للشراكة
                الطلابية. لن تستلم أي رسائل إخبارية أخرى على هذا البريد
                الإلكتروني.
              </Text>

              {/* Feedback Box */}
              <Section
                style={{
                  backgroundColor: "#EFF8F1",
                  padding: "24px",
                  borderRadius: "8px",
                  marginBottom: "32px",
                  borderRight: "4px solid #2C953F",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{
                    color: "#1f2937",
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "16px",
                    fontFamily: "Arial, 'Cairo', sans-serif",
                  }}
                >
                  هل غيرت رأيك؟
                </Text>

                <Text
                  style={{
                    color: "#4b5563",
                    marginBottom: "24px",
                    lineHeight: "1.6",
                    fontSize: "16px",
                    fontFamily: "Arial, 'Cairo', sans-serif",
                  }}
                >
                  يمكنك إعادة الاشتراك في أي وقت للحصول على آخر تحديثات وفرص
                  برنامج إثمار
                </Text>

                {/* Resubscribe Button */}
                <Button
                  href={resubscribeUrl}
                  style={
                    {
                      backgroundColor: "#2C953F",
                      color: "#ffffff",
                      fontWeight: "700",
                      padding: "16px 32px",
                      fontSize: "16px",
                      borderRadius: "24px",
                      textDecoration: "none",
                      display: "inline-block",
                      border: "0",
                      msoLineHeightRule: "exactly",
                    } as React.CSSProperties
                  }
                >
                  إعادة الاشتراك
                </Button>
              </Section>

              {/* We'll Miss You Banner */}
              <Section
                style={{
                  backgroundColor: "#f0f9f1",
                  padding: "32px 16px",
                  marginBottom: "32px",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{
                    color: "#185023",
                    fontSize: "16px",
                    fontWeight: "700",
                    marginBottom: "8px",
                    fontFamily: "Arial, 'Cairo', sans-serif",
                  }}
                >
                  سنفتقدك في مجتمعنا
                </Text>
                <Text
                  style={{
                    color: "#2C953F",
                    margin: "0",
                    fontFamily: "Arial, 'Cairo', sans-serif",
                  }}
                >
                  أبوابنا مفتوحة دائماً للعودة إلى مجتمع إثمار
                </Text>
              </Section>

              {/* Visit Website Button */}
              <Section style={{ textAlign: "center", marginBottom: "32px" }}>
                <Button
                  href="https://ethmar.vercel.app/"
                  style={
                    {
                      backgroundColor: "#2C953F",
                      color: "#ffffff",
                      fontWeight: "700",
                      padding: "16px 32px",
                      fontSize: "16px",
                      borderRadius: "24px",
                      textDecoration: "none",
                      display: "inline-block",
                      border: "0",
                      msoLineHeightRule: "exactly",
                    } as React.CSSProperties
                  }
                >
                  زيارة موقعنا
                </Button>
              </Section>

              <Text
                style={{
                  textAlign: "center",
                  color: "#4b5563",
                  fontFamily: "Arial, 'Cairo', sans-serif",
                }}
              >
                نشكرك على الوقت الذي قضيته معنا!
              </Text>
            </Section>

            {/* Footer */}
            <Section
              style={{
                backgroundColor: "#EFF8F1",
                padding: "32px 24px",
                textAlign: "center",
              }}
            >
              {/* Social Links */}
              <Row style={{ marginBottom: "24px" }}>
                <Column style={{ width: "33.33%", textAlign: "center" }}>
                  <Link
                    href="#"
                    style={{
                      textAlign: "center",
                      color: "#1F682C",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    <table style={{ margin: "0 auto" }}>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              height: "40px",
                              width: "40px",
                              borderRadius: "20px",
                              backgroundColor: "#ffffff",
                              textAlign: "center",
                              verticalAlign: "middle",
                              border: "1px solid rgba(44, 149, 63, 0.2)",
                            }}
                          >
                            <span
                              style={{ color: "#1F682C", fontSize: "16px" }}
                            >
                              𝕏
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingTop: "8px" }}>
                            <span
                              style={{ color: "#1F682C", fontSize: "14px" }}
                            >
                              تويتر
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Link>
                </Column>
                <Column style={{ width: "33.33%", textAlign: "center" }}>
                  <Link
                    href="#"
                    style={{
                      textAlign: "center",
                      color: "#1F682C",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    <table style={{ margin: "0 auto" }}>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              height: "40px",
                              width: "40px",
                              borderRadius: "20px",
                              backgroundColor: "#ffffff",
                              textAlign: "center",
                              verticalAlign: "middle",
                              border: "1px solid rgba(44, 149, 63, 0.2)",
                            }}
                          >
                            <span
                              style={{ color: "#1F682C", fontSize: "16px" }}
                            >
                              📷
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingTop: "8px" }}>
                            <span
                              style={{ color: "#1F682C", fontSize: "14px" }}
                            >
                              إنستغرام
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Link>
                </Column>
                <Column style={{ width: "33.33%", textAlign: "center" }}>
                  <Link
                    href="#"
                    style={{
                      textAlign: "center",
                      color: "#1F682C",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    <table style={{ margin: "0 auto" }}>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              height: "40px",
                              width: "40px",
                              borderRadius: "20px",
                              backgroundColor: "#ffffff",
                              textAlign: "center",
                              verticalAlign: "middle",
                              border: "1px solid rgba(44, 149, 63, 0.2)",
                            }}
                          >
                            <span
                              style={{ color: "#1F682C", fontSize: "16px" }}
                            >
                              in
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingTop: "8px" }}>
                            <span
                              style={{ color: "#1F682C", fontSize: "14px" }}
                            >
                              لينكد إن
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Link>
                </Column>
              </Row>

              <Text
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: "0 0 4px 0",
                }}
              >
                تابعنا:{" "}
                <span style={{ fontWeight: "700", color: "#1F682C" }}>
                  @ETHMAR_SPP
                </span>
              </Text>

              <Text
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  marginBottom: "20px",
                  marginTop: "16px",
                }}
              >
                © 2025 برنامج إثمار للشراكة الطلابية
              </Text>

              <Hr
                style={{
                  borderColor: "#e5e7eb",
                  margin: "16px 0",
                }}
              />

              <Section
                style={{
                  textAlign: "center",
                  margin: "16px 0",
                }}
              >
                <Link
                  href="https://ethmar.vercel.app/privacy"
                  style={{
                    color: "#1F682C",
                    textDecoration: "underline",
                    fontSize: "14px",
                    marginLeft: "12px",
                  }}
                >
                  سياسة الخصوصية
                </Link>
                <Text
                  style={{
                    color: "#d1d5db",
                    display: "inline-block",
                    margin: "0 12px",
                  }}
                >
                  |
                </Text>
                <Link
                  href="https://ethmar.vercel.app/"
                  style={{
                    color: "#1F682C",
                    textDecoration: "underline",
                    fontSize: "14px",
                  }}
                >
                  زيارة الموقع
                </Link>
              </Section>
            </Section>

            {/* Green Bottom Border */}
            <Section
              style={{
                height: "12px",
                backgroundColor: "#2C953F",
              }}
            ></Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default UnsubscribeEmail;
