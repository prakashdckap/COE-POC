import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function useCategoryFilters(id, text) {
  const history = useRouter();
  const { url, sort, order, page } = history?.query;

  let query;
  let variables;

  if (id) {
    query = gql`
      query GetCategoryFilters($id: Int) {
        getCategoryFilters(id: $id) {
          name
          code
          options {
            label
            value
          }
        }
      }
    `;
    variables = { id };
  } else {
    query = gql`
      query GetCategoryFilters($text: String) {
        getCategoryFilters(text: $text) {
          name
          code
          options {
            label
            value
          }
        }
      }
    `;
    variables = { text };
  }

  const [getFilters, { loading, data }] = useLazyQuery(query, {
    skip: !id || !text,
    variables,
  });

  const cleanFilters = (filters, sendAll) => {
    const cleanFilter = [];
    filters?.forEach((filter) => {
      const options = [];
      if (sendAll) {
        filter?.options?.forEach((option) => option?.checked && options?.push(option));
        if (options?.length) cleanFilter?.push({ code: filter?.code, name: filter?.name, options });
      } else {
        filter?.options?.forEach((option) => option?.checked && options?.push(option.value));
        if (options?.length) cleanFilter?.push({ code: filter?.code, options });
      }
    });
    return cleanFilter;
  };

  const updateProductBasedOnFilters = (filters) => {
    const cleanedFilters = cleanFilters(filters, true);
    history.replace({
      pathname: id ? history?.query?.slug[0] : "/productSearch",
      query: {
        q: history?.query?.q || null,
        url,
        id: id || text,
        sort,
        order,
        page,
        client: true,
        filters: JSON.stringify(cleanedFilters),
      },
    });
  };

  const updateFilter = (checked, filters, setFilters, name, value, setclient, setcurrentPage) => {
    const updatedFilter = filters?.map((filter) => {
      if (filter?.code === name) {
        const options = filter?.options.map((option) => {
          if (option?.value === value) {
            return { ...option, checked };
          }
          return option;
        });
        return { ...filter, options, defaultOpen: true };
      }
      return { ...filter, defaultOpen: false };
    });
    updateProductBasedOnFilters(updatedFilter);
    setTimeout(() => setclient(true), 500);
    setcurrentPage(1);
    return setFilters(updatedFilter);
  };

  const cleanMagentoFilters = (filters, sendAll) => {
    const cleanFilter = [];
    filters?.forEach((filter) => {
      const options = [];
      if (sendAll) {
        filter?.options?.forEach((option) => option?.checked && options?.push(option));
        if (options?.length) {
          cleanFilter?.push({
            attribute_code: filter?.attribute_code,
            label: filter?.label,
            options,
          });
        }
      } else {
        filter?.options?.forEach((option) => option?.checked && options?.push(option.value));
        if (options?.length) cleanFilter?.push({ attribute_code: filter?.attribute_code, options });
      }
    });
    return cleanFilter;
  };

  const updateMagentoProductBasedOnFilters = (filters) => {
    const cleanedFilters = cleanMagentoFilters(filters, true);
    history.replace({
      pathname: history?.query?.slug?.[0] || "productSearch",
      query: {
        q: history?.query?.q || null,
        url,
        id: id || text,
        sort,
        order,
        page,
        client: true,
        filters: JSON.stringify(cleanedFilters),
      },
    });
  };

  const updateMagentoFilter = (
    checked,
    filters,
    setFilters,
    name,
    value,
    setclient,
    setcurrentPage
  ) => {
    const updatedFilter = filters?.map((filter) => {
      if (filter?.attribute_code === name) {
        const options = filter?.options.map((option) => {
          if (option?.value === value) {
            return { ...option, checked };
          }
          return option;
        });
        return { ...filter, options, defaultOpen: true };
      }
      return { ...filter, defaultOpen: false };
    });
    updateMagentoProductBasedOnFilters(updatedFilter);
    setTimeout(() => setclient(true), 500);
    setcurrentPage(1);
    return setFilters(updatedFilter);
  };

  return {
    getFilters,
    filterLoading: loading,
    filterData: data?.getCategoryFilters || [],
    updateFilter,
    cleanFilters,
    updateMagentoFilter,
  };
}
