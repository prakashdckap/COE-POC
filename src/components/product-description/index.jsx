import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { fetchProductDetails } from './graphql/query/api';
import useProductsSameBrand from "../../helper/hooks/getOtherProductSameBrand";
import useProductRecommendations from "../../helper/hooks/useProductRecommendations";
import { Gtag_ViewItemEvent } from "../../utils/google-tags/events";
import ProductDescriptionLayoutThree from "./modules/layout/layout-three";
import {
  pageType,
  PorductRecommendation,
} from "./modules/Product-Recomandation/Product-Recommendation";

function ProductDescription({ product }) {
  const [productData, setProductData] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("Original Product Data:", product);

  const { productsRecommendation, getProductRecommendations } = useProductRecommendations({
    currentSku: product?.sku || "",
    pageType: pageType.product,
  });

  const { getProductsSameBrand, products } = useProductsSameBrand();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const productDetails = await fetchProductDetails(product?.sku, product?.productType);
        
        const magentoProductData = productDetails?.apiRestV1Products?.item_info?.items[0] 
                                  || productDetails?.apiRestV1ProductModels?.item_info?.items[0];
        const akeneoProductData = productDetails?.apiRestV1ProductModels?.values;
        const shortDescription = akeneoProductData?.shortDescription?.find(
          (desc) => desc.locale === "en_US" && desc.scope === "ElementVape"
        )?.data || "";
        const name = akeneoProductData?.metaTitle?.[0]?.data || "";
        magentoProductData.productType = product?.productType;

        console.log("Fetched Product Data:", magentoProductData);

        if (magentoProductData) {
          if (magentoProductData && magentoProductData.configurable_options && magentoProductData.variants) {
            const configurableOptions = magentoProductData.configurable_options;
            const variants = magentoProductData.variants;
    
            const formattedOptions = configurableOptions.map((configOption) => {
              const attributeOptions = configOption.values.map((value) => {
                const matchedVariant = variants.find((variant) =>
                  variant.attributes.some(attr => attr.uid === value.uid)
                );
    
                const quantity = matchedVariant?.product.qty || 0;
                const saleQty = matchedVariant?.product.sale_qty || 0;
                const optionImage = matchedVariant?.product.image.url || '';
                const optionPrice = matchedVariant?.product.price_range.maximum_price.final_price.value || 0;
    
                return {
                  __typename: "AttributeOptionsObj",
                  optionCode: value.uid,
                  optionName: value.label,
                  optionValue: null,
                  optionImage: optionImage,
                  quantity: quantity,
                  saleQty: saleQty,
                  optionPrice: {
                    __typename: "Cash",
                    currency: "USD",
                    value: optionPrice
                  }
                };
              });
    
              return {
                __typename: "ProductOptionsObj",
                required: true,
                attributeCode: configOption.uid,
                attributeName: configOption.attribute_code,
                attributeOptions: attributeOptions
              };
            });
    
            magentoProductData.options = formattedOptions;
            magentoProductData.short_description.html = shortDescription;
            magentoProductData.name = name;
            setOptions(formattedOptions);
          }
          setProductData(magentoProductData);
        } else {
          setError("Product not found.");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product data.");
        setLoading(false);
      }
    };
    
    fetchDetails();
  }, [product]);

  useEffect(() => {
    if (product?.sku) {
      getProductRecommendations(product.sku);
      getProductsSameBrand({ sku: product.sku });
      Gtag_ViewItemEvent(product);
    }
  }, [product]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const { id, sku, description, name, price_range } = productData;
  return (
    <div id="main_content">
      <ProductDescriptionLayoutThree
        key={id}
        description={description?.html}
        name={name}
        price={price_range?.minimum_price?.final_price?.value}
        sku={sku}
        id={id}
        product={productData}
      />

      {productsRecommendation?.map((recommend) => (
        <PorductRecommendation key={recommend.id} recommend={recommend} />
      ))}

      {products
        ?.map(({ name, results }) => (
          <PorductRecommendation key={name} productsList={results} recommend={{ storefrontLabel: name }} />
        ))
        .reverse()}
    </div>
  );
}

export default ProductDescription;
