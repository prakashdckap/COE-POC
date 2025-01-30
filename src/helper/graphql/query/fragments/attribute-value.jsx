import META_FIELD from "./meta-field";

const ATTRIBUTE_VALUE = `... on MetaFieldObj {
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
    ... on BooleanObj{
      label
      Boolean: data
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
      Object : data {
        ${META_FIELD}
      }
      	
    }
    ... on ObjectArray{
      label
      ObjectArray: data {
      ${META_FIELD}
      }
    }
  }
  }`;

export default ATTRIBUTE_VALUE;
