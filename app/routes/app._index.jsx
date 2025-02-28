import { Page, Layout, Text, Card, BlockStack } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  return (
    <Page>
      <TitleBar title="Dynamic Discounts App" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="500">
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Welcome to the Dynamic Discounts App!
                </Text>
                <Text variant="bodyMd" as="p">
                  This app helps Shopify developers implement one of the steps
                  for Google Merchant automated discounts.
                </Text>
              </BlockStack>
              <BlockStack gap="200">
                <Text as="h3" variant="headingMd">
                  Key Features
                </Text>
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
              <BlockStack gap="200">
                <Text as="h3" variant="headingMd">
                  Steps to Use
                </Text>
                <Text as="p" variant="bodyMd">
                  1. Install the app in your Shopify store.
                </Text>
                <Text as="p" variant="bodyMd">
                  2. Create a new discount in Shopify Admin by selecting the
                  "Dynamic Discount" variant.
                </Text>
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
