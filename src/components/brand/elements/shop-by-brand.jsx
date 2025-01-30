import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosGraphQL } from "../../../helper/axios";
import { SET_BRAND_NAME } from "../../../redux/actions";
import { BrandListSckeleton } from "../../FallBackUI/brandsFackbackUI";

function ShopByBrand() {
  const [alphaBtn, setAlphaBtn] = useState("All");
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState({});
  const [filterAlphabet, setFilterAlphabet] = useState();
  const [dropdownFilter, setDropdownFilter] = useState([]);
  const brand = useSelector((state) => state.brandName);
  const dispatch = useDispatch();

  const shop = useCallback(async () => {
    setLoading(true);
    try {
      const response = await AxiosGraphQL("shop-by-brand", {
        imageWidth: 1,
        imageHeight: 1,
        showCount: true,
        displayZero: false,
      });
      if (response && response?.ExtAMBrandList) {
        dispatch(SET_BRAND_NAME(response?.ExtAMBrandList));
        setLoading(false);
      } else if (!brand) {
        dispatch(SET_BRAND_NAME({}));
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    shop();
  }, [shop]);

  const alphabetsBtn = [
    "All",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "Y",
    "Z",
    "#",
  ];

  const groupByKey = useCallback(
    (key) => {
      return brand?.items?.reduce((hash, obj) => {
        if (obj[key] === undefined) return hash;
        return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) });
      }, {});
    },
    [brand?.items]
  );

  useEffect(() => {
    setAllData(groupByKey("letter"));
  }, [groupByKey]);

  // Render All Brand Names at Initial
  useEffect(() => {
    setFilterAlphabet(brand?.items?.map((res) => res));
  }, [brand]);

  // Search
  useEffect(() => {
    setDropdownFilter(
      brand?.items?.filter((res) => res.label.toUpperCase()?.includes(search?.toUpperCase()))
    );
  }, [brand?.items, search]);

  const handleAlphabet = (btn) => {
    setAlphaBtn(btn);
    if (btn === "All") {
      setFilterAlphabet(brand?.items.map((res) => res));
    } else if (btn !== "All" && btn !== "#") {
      setFilterAlphabet(brand?.items?.filter((res) => res?.label.charAt(0) === btn));
    } else if (btn === "#") {
      setFilterAlphabet(
        brand?.items.filter((res) => res?.label?.startsWith(res?.label?.match(/\d+/g)))
      );
    }
  };

  return (
    <>
      <div className="mb-5 px-2">
        <strong className="text-sm pb-[15px]  border-b-[3px] border-b-[#121212] text-skin-base font-medium">
          ALL BRANDS
        </strong>
      </div>
      <div className="px-2">
        <input
          className="text-skin-base font-normal text-sm border w-full h-[46px] mt-5 pl-3 border-[#c2c2c2] placeholder:text-skin-base outline-0"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search brand here"
        />
        <span className="search-label">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 40 40">
            <g fill="#626262">
              <path d="M13,3c-5.511,0-10,4.489-10,10c0,5.511,4.489,10,10,10c2.39651,0,4.59738-0.85101,6.32227-2.26367l5.9707,5.9707c0.25082,0.26124,0.62327,0.36648,0.97371,0.27512c0.35044,-0.09136,0.62411,-0.36503,0.71547,-0.71547c0.09136,-0.35044,-0.01388,-0.72289,-0.27512,-0.97371l-5.9707,-5.9707c1.41266,-1.72488,2.26367,-3.92576,2.26367,-6.32227c0,-5.511-4.489-10-10-10zM13,5c4.43012,0,8,3.56988,8,8c0,4.43012-3.56988,8-8,8c-4.43012,0-8-3.56988-8-8c0,-4.43012,3.56988-8,8-8z" />
            </g>
          </svg>
        </span>
        <div className="dropdown-group flex flex-col mb-5" style={{ border: "1px solid #ebebeb" }}>
          {search
            ? dropdownFilter?.map((dd) => (
                <span
                  className="Dropdown-items hover:bg-gray-100"
                  style={{ display: "block", padding: "10px", borderBottom: "1px dotted #ebebeb" }}
                  key={dd.url}
                >
                  <Link href={dd.url}>
                    <a href={dd.url} className="link flex">
                      {dd.label}
                    </a>
                  </Link>
                </span>
              ))
            : ""}
        </div>
      </div>

      <div className="px-2">
        {alphabetsBtn?.map((btn, index) => (
          <button
            key={btn}
            onClick={() => {
              handleAlphabet(btn);
              setIsActive(index);
            }}
            className={`${
              isActive === index ? "bg-skin-secondary text-skin-inverted" : "text-skin-base"
            }  font-medium  text-sm border border-[#ebebeb] mb-4 mr-3 py-[4px] px-[10px] rounded-[3px] hover:bg-skin-button-accent-hover hover:text-skin-inverted`}
            type="button"
          >
            {btn}
          </button>
        ))}
        <div className="text-[#000] font-bold w-[100%] border-b-[1px] border-b-[#ebebeb] mb-[20px] ">
          {alphaBtn}
        </div>
      </div>

      {loading && !allData && !filterAlphabet?.length ? (
        <BrandListSckeleton />
      ) : (
        <div className="px-2">
          {alphaBtn === "All" ? (
            <div>
              {allData &&
                Object.entries(allData)?.map(([key, val, index]) => (
                  <div key={index} className="mb-[20px] px-2">
                    <div className="border-b border-[#ebebeb] mb-[20px]">
                      <span className="px-[12px] py-[4px] font-bold text-[13px]">{key}</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4">
                      {val?.map((res) => (
                        <div className="mb-1" key={res.brand_id}>
                          <Link href={res.url}>
                            <a
                              href={res.url}
                              className="text-skin-base text-[13px] font-normal hover:underline hover:text-skin-primary"
                            >
                              {res.label}
                            </a>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 mb-40">
              {filterAlphabet?.map((res) => (
                <div className="mb-1" key={res.brand_id}>
                  <Link href={res.url}>
                    <a
                      href={res.url}
                      className="text-skin-base text-[13px] font-normal hover:underline hover:text-skin-primary"
                    >
                      {res.label}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ShopByBrand;
