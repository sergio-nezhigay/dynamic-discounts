import { useEffect, useMemo } from "react";
import { useForm, useField } from "@shopify/react-form";

import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import {
  ActiveDatesCard,
  CombinationCard,
  DiscountClass,
  DiscountMethod,
  DiscountStatus,
  SummaryCard,
} from "@shopify/discount-app-components";
import {
  Banner,
  Card,
  Layout,
  Page,
  PageActions,
  TextField,
  BlockStack,
  Box,
} from "@shopify/polaris";

import shopify from "../shopify.server";

export const action = async ({ params, request }) => {
  const { functionId } = params;
  const { admin } = await shopify.authenticate.admin(request);
  const formData = await request.formData();
  const { title, combinesWith, startsAt, endsAt } = JSON.parse(
    formData.get("discount"),
  );

  const baseDiscount = {
    functionId,
    title,
    combinesWith,
    startsAt: new Date(startsAt),
    endsAt: endsAt && new Date(endsAt),
  };

  const response = await admin.graphql(
    `#graphql
        mutation CreateAutomaticDiscount($discount: DiscountAutomaticAppInput!) {
          discountCreate: discountAutomaticAppCreate(automaticAppDiscount: $discount) {
            automaticAppDiscount {
              discountId
            }
            userErrors {
              code
              message
              field
            }
          }
        }`,
    {
      variables: {
        discount: {
          ...baseDiscount,
        },
      },
    },
  );

  const responseJson = await response.json();
  const errors = responseJson.data.discountCreate?.userErrors;
  return { errors };
};

export default function VolumeNew() {
  const submitForm = useSubmit();
  const actionData = useActionData();
  const navigation = useNavigation();
  const todaysDate = useMemo(() => new Date(), []);

  const isLoading = navigation.state === "submitting";

  const submitErrors = actionData?.errors || [];
  const returnToDiscounts = () => open("shopify://admin/discounts", "_top");

  useEffect(() => {
    if (actionData?.errors?.length === 0) {
      returnToDiscounts();
    }
  }, [actionData]);

  const {
    fields: { discountTitle, combinesWith, startDate, endDate },
    submit,
  } = useForm({
    fields: {
      discountTitle: useField(""),
      combinesWith: useField({
        orderDiscounts: false,
        productDiscounts: false,
        shippingDiscounts: false,
      }),
      startDate: useField(todaysDate),
      endDate: useField(null),
    },
    onSubmit: async (form) => {
      const discount = {
        title: form.discountTitle,
        combinesWith: form.combinesWith,
        startsAt: form.startDate,
        endsAt: form.endDate,
      };

      submitForm({ discount: JSON.stringify(discount) }, { method: "post" });

      return { status: "success" };
    },
  });

  const errorBanner =
    submitErrors.length > 0 ? (
      <Layout.Section>
        <Banner tone="critical">
          <p>There were some issues with your form submission:</p>
          <ul>
            {submitErrors.map(({ message, field }, index) => {
              return (
                <li key={`${message}${index}`}>
                  {field.join(".")} {message}
                </li>
              );
            })}
          </ul>
        </Banner>
      </Layout.Section>
    ) : null;

  return (
    <Page>
      <ui-title-bar title="Create volume discount">
        <button variant="breadcrumb" onClick={returnToDiscounts}>
          Discounts
        </button>
        <button variant="primary" onClick={submit}>
          Save discount
        </button>
      </ui-title-bar>
      <Layout>
        {errorBanner}
        <Layout.Section>
          <Form method="post">
            <BlockStack align="space-around" gap="200">
              <Box paddingBlockEnd="300">
                <Card>
                  <BlockStack>
                    <TextField
                      label="Title"
                      autoComplete="on"
                      {...discountTitle}
                    />
                  </BlockStack>
                </Card>
              </Box>
              <CombinationCard
                combinableDiscountTypes={combinesWith}
                discountClass={DiscountClass.Product}
                discountDescriptor={"Discount"}
              />
              <ActiveDatesCard
                startDate={startDate}
                endDate={endDate}
                timezoneAbbreviation="EST"
              />
            </BlockStack>
          </Form>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <SummaryCard
            header={{
              discountMethod: DiscountMethod.Automatic,
              discountDescriptor: discountTitle.value,
              appDiscountType: "Volume",
              isEditing: false,
            }}
            performance={{
              status: DiscountStatus.Scheduled,
              usageCount: 0,
              isEditing: false,
            }}
            usageLimits={{
              oncePerCustomer: false,
              totalUsageLimit: null,
            }}
            activeDates={{
              startDate: startDate.value,
              endDate: endDate.value,
            }}
          />
        </Layout.Section>
        <Layout.Section>
          <PageActions
            primaryAction={{
              content: "Save discount",
              onAction: submit,
              loading: isLoading,
            }}
            secondaryActions={[
              {
                content: "Discard",
                onAction: returnToDiscounts,
              },
            ]}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
