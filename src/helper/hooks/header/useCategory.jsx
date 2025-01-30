import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosGraphQL } from "../../axios";
import { SET_MEGA_MENU } from "../../../redux/actions";

function useCategory() {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const megaMenu = useSelector((state) => state.megaMenu);

  const parentCategory = async () => {
    const response = await AxiosGraphQL("category");

    if (response && response?.megamenu?.content) {

      dispatch(SET_MEGA_MENU(response?.megamenu?.content));
    }
  };

  useEffect(() => {
    const newArr = [];

    if (megaMenu.length) {
      setData(
        JSON?.parse(megaMenu)?.map((e) => {
          if (e.depth === 0) {
            newArr.push([e]);
          } else {
            newArr[newArr.length - 1].push(e);
          }
          return newArr;
        })
      );
    }
  }, [megaMenu]);

  return {
    parentCategory,
    data,
  };
}

export default useCategory;
