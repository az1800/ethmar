// components/email-templates/ResubscribeEmail.tsx
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

interface ResubscribeEmailProps {
  email: string;
  name?: string;
}

const ResubscribeEmail = ({ email, name = "" }: ResubscribeEmailProps) => {
  // Common styles that we'll reuse
  const fontFamily = "Arial, 'Tajawal', 'Cairo', sans-serif";
  const primaryColor = "#2C953F";
  const primaryGradient = "linear-gradient(135deg, #185023, #2C953F)";
  const lightGreen = "#EFF8F1";
  const darkGreen = "#1F682C";
  const textColor = "#4b5563";
  const headingColor = "#1f2937";

  return (
    <Html lang="ar" dir="rtl">
      <Head>
        <title>إثمار - أهلاً بك مجدداً</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Body
        style={{
          margin: "0",
          padding: "0",
          fontFamily,
          direction: "rtl",
          backgroundColor: "#f3f4f6",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <Container
          style={{
            backgroundColor: "#f3f4f6",
            padding: "24px 12px",
            maxWidth: "600px",
            width: "100%",
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
                backgroundColor: primaryColor,
                backgroundImage: primaryGradient,
                padding: "48px 24px",
                textAlign: "center",
                color: "#ffffff",
                position: "relative",
              }}
            >
              <Img
                src="https://nqveldgyeonkhrsrsjbn.supabase.co/storage/v1/object/public/companies/ethmarlogoS.svg"
                alt="شعار اثمار"
                width="80"
                height="80"
                style={{
                  display: "block",
                  margin: "0 auto 20px",
                  maxWidth: "80px",
                }}
              />
              <Heading
                as="h2"
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  margin: "16px 0",
                  color: "#ffffff",
                  fontFamily,
                }}
              >
                مرحباً بعودتك إلى مجتمع إثمار
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
                  color: headingColor,
                  textAlign: "center",
                  marginBottom: "24px",
                  fontFamily,
                }}
              >
                {name ? `أهلاً ${name}!` : "أهلاً بك مجدداً!"}
              </Text>

              <Text
                style={{
                  color: textColor,
                  marginBottom: "32px",
                  lineHeight: "1.6",
                  fontSize: "16px",
                  fontFamily,
                  textAlign: "center",
                }}
              >
                نحن سعداء بعودتك إلى النشرة الإخبارية لبرنامج إثمار للشراكة
                الطلابية. لقد تم إعادة تفعيل اشتراكك، وستبدأ باستلام آخر الأخبار
                والفرص قريباً.
              </Text>

              {/* Highlight Box */}
              <Section
                style={{
                  backgroundColor: lightGreen,
                  padding: "24px",
                  borderRadius: "8px",
                  marginBottom: "32px",
                  borderRight: `4px solid ${primaryColor}`,
                }}
              >
                <Text
                  style={{
                    color: headingColor,
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "16px",
                    fontFamily,
                  }}
                >
                  ما الذي يميزنا:
                </Text>

                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                  }}
                  cellPadding={0} // Changed from "0" to {0}
                  cellSpacing={0} // Changed from "0" to {0}
                  border={0} // Changed from "0" to {0}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          width: "30px",
                          verticalAlign: "top",
                          paddingTop: "3px",
                          paddingLeft: "8px",
                        }}
                      >
                        <span
                          style={{
                            color: primaryColor,
                            fontSize: "18px",
                          }}
                        >
                          ◆
                        </span>
                      </td>
                      <td style={{ paddingBottom: "16px" }}>
                        <span style={{ color: textColor, fontSize: "16px" }}>
                          فرص حصرية للطلاب المتميزين
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "30px",
                          verticalAlign: "top",
                          paddingTop: "3px",
                          paddingLeft: "8px",
                        }}
                      >
                        <span
                          style={{
                            color: primaryColor,
                            fontSize: "18px",
                          }}
                        >
                          ◆
                        </span>
                      </td>
                      <td style={{ paddingBottom: "16px" }}>
                        <span style={{ color: textColor, fontSize: "16px" }}>
                          محتوى تعليمي وإرشادي متميز
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "30px",
                          verticalAlign: "top",
                          paddingTop: "3px",
                          paddingLeft: "8px",
                        }}
                      >
                        <span
                          style={{
                            color: primaryColor,
                            fontSize: "18px",
                          }}
                        >
                          ◆
                        </span>
                      </td>
                      <td>
                        <span style={{ color: textColor, fontSize: "16px" }}>
                          تحديثات مستمرة عن برنامج إثمار
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Section>

              {/* CTA Button */}
              <Section style={{ textAlign: "center", marginBottom: "32px" }}>
                <Button
                  href="https://ethmar.vercel.app/"
                  style={
                    {
                      backgroundColor: primaryColor,
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
                  اكتشف الفرص الجديدة
                </Button>
              </Section>

              <Text
                style={{
                  textAlign: "center",
                  color: textColor,
                  fontFamily,
                }}
              >
                نتطلع للمساهمة في رحلتك المهنية!
              </Text>
            </Section>

            {/* Footer */}
            <Section
              style={{
                backgroundColor: lightGreen,
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
                      color: darkGreen,
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    <table
                      style={{ margin: "0 auto" }}
                      cellPadding={0} // Changed from "0" to {0}
                      cellSpacing={0} // Changed from "0" to {0}
                      border={0} // Changed from "0" to {0}
                    >
                      <tr>
                        <td
                          style={{
                            height: "40px",
                            width: "40px",
                            borderRadius: "20px",
                            backgroundColor: "#ffffff",
                            textAlign: "center",
                            verticalAlign: "middle",
                            border: `1px solid rgba(44, 149, 63, 0.2)`,
                          }}
                        >
                          <span style={{ color: darkGreen, fontSize: "16px" }}>
                            𝕏
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ paddingTop: "8px" }}>
                          <span style={{ color: darkGreen, fontSize: "14px" }}>
                            تويتر
                          </span>
                        </td>
                      </tr>
                    </table>
                  </Link>
                </Column>
                <Column style={{ width: "33.33%", textAlign: "center" }}>
                  <Link
                    href="#"
                    style={{
                      textAlign: "center",
                      color: darkGreen,
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    <table
                      style={{ margin: "0 auto" }}
                      cellPadding={0} // Changed from "0" to {0}
                      cellSpacing={0} // Changed from "0" to {0}
                      border={0} // Changed from "0" to {0}
                    >
                      <tr>
                        <td
                          style={{
                            height: "40px",
                            width: "40px",
                            borderRadius: "20px",
                            backgroundColor: "#ffffff",
                            textAlign: "center",
                            verticalAlign: "middle",
                            border: `1px solid rgba(44, 149, 63, 0.2)`,
                          }}
                        >
                          <span style={{ color: darkGreen, fontSize: "16px" }}>
                            📷
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ paddingTop: "8px" }}>
                          <span style={{ color: darkGreen, fontSize: "14px" }}>
                            إنستغرام
                          </span>
                        </td>
                      </tr>
                    </table>
                  </Link>
                </Column>
                <Column style={{ width: "33.33%", textAlign: "center" }}>
                  <Link
                    href="#"
                    style={{
                      textAlign: "center",
                      color: darkGreen,
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    <table
                      style={{ margin: "0 auto" }}
                      cellPadding={0} // Changed from "0" to {0}
                      cellSpacing={0} // Changed from "0" to {0}
                      border={0} // Changed from "0" to {0}
                    >
                      <tr>
                        <td
                          style={{
                            height: "40px",
                            width: "40px",
                            borderRadius: "20px",
                            backgroundColor: "#ffffff",
                            textAlign: "center",
                            verticalAlign: "middle",
                            border: `1px solid rgba(44, 149, 63, 0.2)`,
                          }}
                        >
                          <span style={{ color: darkGreen, fontSize: "16px" }}>
                            in
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ paddingTop: "8px" }}>
                          <span style={{ color: darkGreen, fontSize: "14px" }}>
                            لينكد إن
                          </span>
                        </td>
                      </tr>
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
                <span style={{ fontWeight: "700", color: darkGreen }}>
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
                  href="https://ethmar.vercel.app/unsubscribe"
                  style={{
                    color: darkGreen,
                    textDecoration: "underline",
                    fontSize: "14px",
                    marginLeft: "12px",
                  }}
                >
                  إلغاء الاشتراك
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
                    color: darkGreen,
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
                backgroundColor: primaryColor,
              }}
            ></Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ResubscribeEmail;
