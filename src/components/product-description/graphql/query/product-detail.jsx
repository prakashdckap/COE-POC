export const getProductDetailsQuery = (sku, productType) => {
  const typeQuery = productType === "configurable"
    ? `
      query MyQuery {
        apiRestV1ProductModels(code: "${sku}") {
          code
          family
          familyVariant
          parent
          values
    `
    : `
      query MyQuery {
        apiRestV1Products(code: "${sku}") {
          identifier
          family
          attribute_info
    `;
    
  return typeQuery + `
     item_info {
       aggregations{
           attribute_code
       label
       count
       options{
         count
         label
         value
       }
       }
     total_count
     items {
       created_at
       # most_reviewed
       ... on CustomizableProductInterface{
         
 ... on CustomizableProductInterface  {
   options {
     required
     title
     uid
     __typename
      ... on CustomizableDropDownOption {
       value {
         qty
         option_type_id
         price
         sku
         title
         price_type
         uid
         sale_qty
       }
     }
   }
 }
 
       }
       ... on ConfigurableProduct {
         
 ... on ConfigurableProduct {
   configurable_options {
     attribute_code
     attribute_uid
     uid
     use_default
 
     values {
       uid
       default_label
       swatch_data {
         ... on ImageSwatchData {
           thumbnail
         }
         value
       }
       label
     }
   }
   variants {
     product {
       
 ... on SimpleProduct {
   
 ... on ProductInterface {
   uid
   id
   name
   sku
   qty
   stock_status
   sale_qty
   short_description{
     html
   }
   description {
     __typename
     html
   }
   product_attachment{
     id
     title
     sort_order
     file_type
     file_url
   }
   image {
     label
     url
   }
   media_gallery {
     url
     label
     position
     uid
     ... on ProductVideo {
       video_content {
         media_type
         video_provider
         video_url
         video_title
         video_description
         video_metadata
       }
     }
   }
   ... on BundleProduct {
     dynamic_sku
     dynamic_price
     dynamic_weight
     price_view
     ship_bundle_items
     items {
       option_id
       title
       sku
       
       uid
       type
       required
       position
       options {
         id
         label
         quantity
         can_change_quantity
         
         price
         sku
         sale_qty
         price_type
         position
         product {
           id
           name
           sku
           sale_qty
           qty
           stock_status
           media_gallery{
               url
               position
               label
               uid
           }
         }
       }
     }
   }
   updated_at
   # stock_status
   __typename
   manufacturer
   review_count
   rating_summary
   price_range {
     maximum_price {
       
 ... on ProductPrice {
   regular_price {
     currency
     value
   }
   final_price {
     currency
     value
   }
   discount {
     amount_off
     percent_off
   }
 }
 
     }
     minimum_price {
       
 ... on ProductPrice {
   regular_price {
     currency
     value
   }
   final_price {
     currency
     value
   }
   discount {
     amount_off
     percent_off
   }
 }
 
     }
   }
   url_key
   brands
   url_suffix
   meta_title
   meta_keyword
   meta_description
   custom_attributes {
     code
     label
     ... on IntegerObj{
       Integer : value
     }
     ... on StringObj {
       String: value
     }
     ... on BooleanObj{
       Boolean : value
     }
     ... on Object{
       Object : value {
         
 ... on CustomObject {
   country
   state
   website_id
   website_value
 }
 
       }
     }
     ... on ObjectArray{
       value{
         
 ... on CustomObject {
   country
   state
   website_id
   website_value
 }
 
       }
     }
   }
   categories {
     name
     id
     uid
   }
   crosssell_products{
     uid
     id
     name
   }
   
   upsell_products {
     uid
     id
     name
   }
   related_products {
     uid
     id
     name
   }
 }
 
   
 }
     
     }
     attributes {
       uid
       label
       code
       value_index
     }
   }
 
  }
 
       }
       
 ... on ProductInterface {
   uid
   id
   name
   sku
   stock_status
   qty
   short_description{
     html
   }
   description {
     __typename
     html
   }
   product_attachment{
     id
     title
     sort_order
     file_type
     file_url
   }
   image {
     label
     url
   }
   media_gallery {
     url
     position
     label
     uid
     ... on ProductVideo {
       video_content {
         media_type
         video_provider
         video_url
         video_title
         video_description
         video_metadata
       }
     }
   }
   ... on BundleProduct {
     dynamic_sku
     dynamic_price
     dynamic_weight
     price_view
     ship_bundle_items
     items {
       option_id
       uid
       title
       sku
       type
       required
       position
       options {
         id
         label
         quantity
         can_change_quantity
         price
         sale_qty
         price_type
         position
         product {
           id
           uid
           name
           
           sku
           qty
           stock_status
           media_gallery{
               label
               url
               position
               uid
           }
         }
       }
     }
   }
   updated_at
   # stock_status
   __typename
   manufacturer
   review_count
   rating_summary
   price_range {
     maximum_price {
       
 ... on ProductPrice {
   regular_price {
     currency
     value
   }
   final_price {
     currency
     value
   }
   discount {
     amount_off
     percent_off
   }
 }
 
     }
     minimum_price {
       
 ... on ProductPrice {
   regular_price {
     currency
     value
   }
   final_price {
     currency
     value
   }
   discount {
     amount_off
     percent_off
   }
 }
 
     }
   }
   url_key
   brands
   url_suffix
   meta_title
   meta_keyword
   meta_description
   custom_attributes {
     code
     label
     ... on IntegerObj{
       Integer : value
     }
     ... on StringObj {
       String: value
     }
     ... on BooleanObj{
       Boolean : value
     }
     ... on Object{
       Object : value {
         
 ... on CustomObject {
   country
   state
   website_id
   website_value
 }
 
       }
     }
     ... on ObjectArray{
       value{
         
 ... on CustomObject {
   country
   state
   website_id
   website_value
 }
 
       }
     }
   }
   categories {
     name
     id
     uid
   }
   crosssell_products{
     uid
     id
     name
   }
   
   upsell_products {
     uid
     id
     name
   }
   related_products {
     uid
     id
     name
   }
 }
 
       
 ... on SimpleProduct {
   options {
     required
     title
     uid
     __typename
      ... on CustomizableDropDownOption {
       value {
         qty
         option_type_id
         price
         sku
         title
         price_type
         uid
         sale_qty
       }
     }
   }
 }
   
     }
     page_info {
       current_page
       page_size
       total_pages
     }
     sort_fields {
       default
       options {
         label
         value
       }
     }
   }
   }
 }
 `;
};
