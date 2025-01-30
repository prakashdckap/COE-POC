export default function useGetCardType() {
  const handleCardType = (number) => {
    // AMEX
    let re = new RegExp("^3[47]");
    if (number.match(re) != null) return "AE";

    // visa
    re = new RegExp("^4");
    if (number.match(re) != null) return "VI";

    // Mastercard
    if (
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
        number
      )
    )
      return "MC";

    // Discover
    re = new RegExp(
      "^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)"
    );
    if (number.match(re) != null) return "DI";

    return "";
  };

  return { handleCardType };
}
