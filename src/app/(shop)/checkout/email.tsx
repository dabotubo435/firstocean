import { Tables } from "@/supabase/types";
import { currency } from "@/utils/formatter";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Text,
} from "@react-email/components";
import { CSSProperties } from "react";

type Props = {
  totalPrice: number;
  orderProducts: (Tables<"order_products"> & {
    product: Tables<"products"> | null;
  })[];
};

export function OrderCheckoutEmail({ totalPrice, orderProducts }: Props) {
  return (
    <Html>
      <Head />
      <Preview>
        Thank you for placing your order with First Ocean Supermarket
      </Preview>
      <Body style={styles.main}>
        <Container style={styles.topContainer}>
          <Img
            src="https://www.firstoceansupermarket.com/logo.png"
            style={styles.logo}
          />

          <Heading style={styles.heading}>Hello,</Heading>
          <Text style={styles.text}>
            Thank you for placing your order. We are processing your order and
            we will contact you for payment and shipping.
          </Text>
        </Container>
        <Container style={styles.container}>
          <Heading style={styles.subHeading}>
            Here are the details of your order:
          </Heading>
          <Row style={{ padding: "10px" }}>
            <Column style={styles.text} align="left" width="25%">
              Name
            </Column>
            <Column style={styles.text} align="left" width="25%">
              Price
            </Column>
            <Column style={styles.text} align="center" width="25%">
              Quantity
            </Column>
            <Column style={styles.text} align="right" width="25%">
              Total
            </Column>
          </Row>
          {orderProducts.map(({ product, quantity }) => {
            const price = product?.price ?? 0;
            return (
              <Row
                key={product?.id}
                style={{ padding: "10px", backgroundColor: "#f6f6f6" }}
              >
                <Column style={styles.text} align="left" width="25%">
                  {product?.name}
                </Column>
                <Column style={styles.text} align="left" width="25%">
                  {currency.format(price)}
                </Column>
                <Column style={styles.text} align="center" width="25%">
                  x{quantity}
                </Column>
                <Column style={styles.text} align="right" width="25%">
                  {currency.format(price * quantity)}
                </Column>
              </Row>
            );
          })}
          <Text
            style={{ fontWeight: "600", fontSize: "16px", textAlign: "end" }}
          >
            Total: {currency.format(totalPrice)}
          </Text>
        </Container>
        <Container style={styles.container}>
          <Hr />
          <Text style={styles.footerText}>First Ocean Supermarket</Text>
        </Container>
      </Body>
    </Html>
  );
}

export function OrderNotificationEmail({
  totalPrice,
  orderProducts,
  orderId,
  email,
}: Props & { orderId: number; email: string }) {
  return (
    <Html>
      <Head />
      <Preview>
        A new order has been placed with Order ID #{`${orderId}`}
      </Preview>
      <Body style={styles.main}>
        <Container style={styles.topContainer}>
          <Img
            src="https://www.firstoceansupermarket.com/logo.png"
            style={styles.logo}
          />

          <Heading style={styles.heading}>Hello Admin,</Heading>
          <Text style={styles.text}>
            A new order has been placed with Order ID{" "}
            <Link
              href={`https://www.firstoceansupermarket.com/admin/orders/${orderId}`}
              style={{ fontWeight: 500, textDecoration: "underline" }}
            >
              #{`${orderId}`}
            </Link>
            . Kindly contact them via email at{" "}
            <Link
              href={`mailto:${email}`}
              style={{ fontWeight: 500, textDecoration: "underline" }}
            >
              {email}
            </Link>
            .
          </Text>
        </Container>
        <Container style={styles.container}>
          <Heading style={styles.subHeading}>
            Here are the details of the order:
          </Heading>
          <Row style={{ padding: "10px" }}>
            <Column style={styles.text} align="left" width="25%">
              Name
            </Column>
            <Column style={styles.text} align="left" width="25%">
              Price
            </Column>
            <Column style={styles.text} align="center" width="25%">
              Quantity
            </Column>
            <Column style={styles.text} align="right" width="25%">
              Total
            </Column>
          </Row>
          {orderProducts.map(({ product, quantity }) => {
            const price = product?.price ?? 0;
            return (
              <Row
                key={product?.id}
                style={{ padding: "10px", backgroundColor: "#f6f6f6" }}
              >
                <Column style={styles.text} align="left" width="25%">
                  {product?.name}
                </Column>
                <Column style={styles.text} align="left" width="25%">
                  {currency.format(price)}
                </Column>
                <Column style={styles.text} align="center" width="25%">
                  x{quantity}
                </Column>
                <Column style={styles.text} align="right" width="25%">
                  {currency.format(price * quantity)}
                </Column>
              </Row>
            );
          })}
          <Text
            style={{ fontWeight: "600", fontSize: "16px", textAlign: "end" }}
          >
            Total: {currency.format(totalPrice)}
          </Text>
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
