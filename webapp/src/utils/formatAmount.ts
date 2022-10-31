export const formatAmount = (
  amount = 0,
  decimals = 6,
) => new Intl.NumberFormat(
  'en-US', {
    maximumSignificantDigits: 4,
  }
).format(amount * 10**-decimals);
