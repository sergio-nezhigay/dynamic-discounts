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
      <TitleBar title="Volume Discount App" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="500">
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Welcome to the Volume Discount App!
                </Text>
                <Text variant="bodyMd" as="p">
                  This app allows you to create automatic volume discounts for
                  your Shopify store
                </Text>
              </BlockStack>
              <BlockStack gap="200">
                <Text as="h3" variant="headingMd">
                  Key Features
                </Text>
                <Text as="p" variant="bodyMd">
                  <Text as="b">Automatic Discounts:</Text> Create discounts that
                  apply automatically when customers meet certain quantity
                  thresholds.
                </Text>
                <Text as="p" variant="bodyMd">
                  <Text as="b">Volume-Based:</Text> Set different discount
                  percentages based on the quantity of items in the cart.
                </Text>
                <Text as="p" variant="bodyMd">
                  <Text as="b">Easy Configuration:</Text> Define the quantity
                  required and the discount percentage in a simple form.
                </Text>
                <Text as="p" variant="bodyMd">
                  <Text as="b">Combinable:</Text> Set if the discount can be
                  combined with other discounts.
                </Text>
              </BlockStack>
              <BlockStack gap="200">
                <Text as="h3" variant="headingMd">
                  How to Use
                </Text>
                <Text as="p" variant="bodyMd">
                  Create a new discount in the navigation menu.
                </Text>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
