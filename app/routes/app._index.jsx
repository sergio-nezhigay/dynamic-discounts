import { useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  InlineStack,
  Link,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const storeName = shop.split(".")[0];
  const adminDiscountsUrl = `https://admin.shopify.com/store/${storeName}/discounts`;

  await authenticate.admin(request);
  return { adminDiscountsUrl };
};

export default function Index() {
  const { adminDiscountsUrl } = useLoaderData();

  return (
    <Page>
      <TitleBar title="Dynamic Discounts App" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="500">
              <Text as="h3" variant="headingMd">
                App Status
              </Text>
              <Text as="p" variant="bodyMd">
                Your app is connected and operational.
              </Text>
              <Button
                url={adminDiscountsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to Shopify Admin Discounts
              </Button>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <BlockStack gap="500">
              <Text as="h2" variant="headingMd">
                Welcome to the Dynamic Discounts App!
              </Text>

              <Text as="h3" variant="headingMd">
                Key Features
              </Text>
              <BlockStack gap="200">
                <Text as="p" variant="bodyMd">
                  <Text as="b">Title-defined discounts:</Text> Apply discounts
                  dynamically based on rules defined in product titles.
                </Text>

                <Text as="p" variant="bodyMd">
                  <Text as="b">Easy Setup:</Text> Simply configure discounts in
                  Shopify Admin using this app.
                </Text>
              </BlockStack>

              <Text as="h3" variant="headingMd">
                Discount Rule Format
              </Text>
              <BlockStack gap="200">
                <Text as="p" variant="bodyMd">
                  The app recognizes discount rules embedded in product titles
                  using the following format:
                </Text>
                <Text as="p" variant="bodyMd">
                  <Text as="code">Product Name – discount $X </Text>
                </Text>
                <Text as="p" variant="bodyMd">
                  <Text as="b">Examples:</Text>
                </Text>
                <Text as="p" variant="bodyMd">
                  • "Mouse Logitech M185 red (910-002240) – discount $10" -
                  applies a 10 discount
                </Text>
              </BlockStack>

              <Text as="h3" variant="headingMd">
                Steps to Use
              </Text>
              <BlockStack gap="200">
                <Text as="p" variant="bodyMd">
                  1. Install the app in your Shopify store. (Already done!)
                </Text>
                <InlineStack gap="400" blockAlign="center">
                  <Text as="p" variant="bodyMd">
                    2. Create a new discount in{" "}
                    <Link
                      url={adminDiscountsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Shopify Admin Discounts
                    </Link>{" "}
                    by selecting the "Dynamic Discount" variant.
                  </Text>
                </InlineStack>
                <Text as="p" variant="bodyMd">
                  3. Format your product titles to include the discount rule as
                  shown in the example above.
                </Text>
                <Text as="p" variant="bodyMd">
                  4. Define additional settings (optional, e.g., start/end
                  dates, stacking rules).
                </Text>
                <Text as="p" variant="bodyMd">
                  5. Save and activate the discount rule.
                </Text>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
