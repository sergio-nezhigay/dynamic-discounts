# Dynamic Discounts App for Shopify

A Shopify app that applies discounts dynamically based on rules defined in product titles.

## Overview

The Dynamic Discounts App enables merchants to offer automated discounts by defining discount rules directly within product titles. This provides a flexible way to apply discounts without requiring complex discount rule creation for each product.

## Features

- **Title-defined discounts:** Apply discounts dynamically based on rules defined in product titles
- **Easy Setup:** Simple configuration through Shopify Admin
- **Custom discount rules:** Support for currency-specific discount amounts

## Installation

1. Install the app from the Shopify App Store
2. Authorize the app with your Shopify store
3. Once installed, you can start creating dynamic discounts

## Usage

### Creating Discount Rules

1. Format your product titles to include discount rules using the following format:

   ```
   Product Name – discount $X
   ```

2. Create a new discount in Shopify Admin Discounts by selecting the "Dynamic Discount" variant
3. Define any additional settings (e.g., start/end dates, stacking rules)
4. Save and activate the discount rule

### Example Discount Rules

The following examples show how to format product titles to include discount rules:

- `Mouse Logitech M185 red (910-002240) – discount $10` - Applies a $10 discount

### How It Works

1. The app scans product titles for the discount rule format
2. When a matching product is added to the cart, the specified discount is applied
3. The discount amount is extracted from the title and processed at checkout

## Development

This app is built using:

- Remix.js
- Shopify Polaris design system
- Shopify App Bridge

## Support

For questions or issues, please contact support at [nezhihai@gmail.com](mailto:nezhihai@gmail.com)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
