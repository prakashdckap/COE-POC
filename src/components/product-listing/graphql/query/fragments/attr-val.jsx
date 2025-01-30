const ATTR_VAL = `

... on MetaFieldObj {
    attributeValue {
      __typename
      ... on StringObj {
        label
        String: data
      }
      ... on IntegerObj {
        label
        Integer: data
      }
      ... on IntegerArrayObj {
        label
        IntArray: data
      }
      ... on StringArrayObj {
        label
        StrArray: data
      }
       ... on Object {
        label
        Object: data
      }
    }
  }
`;

export default ATTR_VAL;
