import { DiscountApplicationStrategy } from "../generated/api";

const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

export function run(input) {
  console.log("input:", JSON.stringify(input, null, 2));

  const discountTargets = {};

  input.cart.lines.forEach((line) => {
    let discountAmount = null;

    if (line.attribute && line.attribute.key === "discount-amount") {
      const attrDiscount = parseFloat(line.attribute.value);
      if (!isNaN(attrDiscount)) {
        discountAmount = attrDiscount;
      }
    } else if (
      line.merchandise.product.title &&
      (line.merchandise.product.title.includes("знижка") ||
        line.merchandise.product.title.includes("discount"))
    ) {
      //Мишка Logitech M185 red (910-002240) – знижка $10
      //Мишка Logitech M185 red (910-002240) – знижка 100 грн
      //Мишка Logitech M185 red (910-002240) – discount 100 грн
      const discountMatch = line.merchandise.product.title.match(
        /(знижка|discount)\s+\$?(\d+)/i,
      );
      if (discountMatch && discountMatch[2]) {
        discountAmount = parseFloat(discountMatch[2]);
      }
    }

    if (discountAmount !== null) {
      if (!discountTargets[discountAmount]) {
        discountTargets[discountAmount] = [];
      }
      discountTargets[discountAmount].push({
        productVariant: { id: line.merchandise.id },
      });
    }
  });

  const discountAmounts = Object.keys(discountTargets);
  if (discountAmounts.length === 0) {
    return EMPTY_DISCOUNT;
  }

  const discounts = discountAmounts.map((amount) => ({
    targets: discountTargets[amount],
    value: {
      fixedAmount: {
        amount: parseFloat(amount),
        appliesToEachItem: true,
      },
    },
    message: `Discount`,
  }));

  return {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts: discounts,
  };
}
