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
    } else if (line.merchandise.product.title.includes("red")) {
      discountAmount = 1;
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
    message: `Sergio discount1523 ${amount} applied`,
  }));

  return {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts: discounts,
  };
}
