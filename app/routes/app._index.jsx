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
              <Text variant="bodyMd" as="p">
                This app helps Shopify developers implement one of the steps for
                Google Merchant automated discounts.
              </Text>

              <Text as="h3" variant="headingMd">
                Key Features
              </Text>
              <BlockStack gap="200">
                <Text as="p" variant="bodyMd">
                  <Text as="b">Cart attribute</Text> - based discounts: apply
                  discounts dynamically based on cart attributes.
                </Text>
                <Text as="p" variant="bodyMd">
                  <Text as="b">Google Merchant Integration:</Text> Supports
                  Google automated discounts by processing predefined discount
                  amounts.
                </Text>
                <Text as="p" variant="bodyMd">
                  <Text as="b">Easy Setup:</Text> Simply configure discounts in
                  Shopify Admin using this app.
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
                  3. Define additional settings (optional, e.g., start/end
                  dates, stacking rules).
                </Text>
                <Text as="p" variant="bodyMd">
                  4. Save and activate the discount rule.
                </Text>
                <Text as="p" variant="bodyMd">
                  <Text as="b">Note:</Text> Developers must handle feed
                  adjustments and token processing separately to store the
                  discount amount in the "discount-amount" cart attribute.
                </Text>
                <Text as="p" variant="bodyMd">
                  <Text as="b">Important:</Text> The discount value applied is
                  taken from the cart attribute with the key "discount-amount".
                  Ensure that this attribute is correctly set before the
                  discount is processed.
                </Text>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
