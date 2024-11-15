import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import { CSSProperties } from "react";

type Props = {
  name: string;
  email: string;
  message: string;
};

export function ContactEmail({ name, email, message }: Props) {
  return (
    <Html>
      <Head />
      <Preview>New contact email - {name}</Preview>
      <Body style={styles.main}>
        <Container style={styles.topContainer}>
          <Img
            src="https://www.firstoceansupermarket.com/logo.png"
            style={styles.logo}
          />

          <Heading style={styles.heading}>New contact email</Heading>
          <Heading style={styles.subHeading}>
            {name} <Link href={`mailto:${email}`}>{`<${email}>`}</Link>
          </Heading>
          <Text style={styles.text}>{message}</Text>
        </Container>

        <Container style={styles.container}>
          <Hr />
          <Text style={styles.footerText}>First Ocean Supermarket</Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  main: {
    margin: "0 auto",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
  topContainer: {
    margin: "auto",
    padding: "96px 20px 20px",
  },
  container: {
    margin: "auto",
    padding: "0 20px 20px",
  },
  logo: {
    height: "64px",
    width: "auto",
    margin: "0 auto 20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "600",
    lineHeight: "40px",
    margin: "0 0 20px",
  },
  subHeading: {
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "40px",
    margin: "0 0 20px",
  },
  text: {
    fontSize: "14px",
    lineHeight: "24px",
    margin: "0 0 20px",
  },
  footerText: {
    color: "#898989",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "24px",
    margin: "0 0 20px",
    textAlign: "center",
  },
} satisfies Record<string, CSSProperties>;
