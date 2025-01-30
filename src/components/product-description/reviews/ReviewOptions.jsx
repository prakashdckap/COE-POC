export default function ReviewOptions({ handleSeclectChange, recommendReview, easyReview }) {
  return (
    <>
      <div>
        <p className="text-sm text-[#6B6D76] mt-[10px] mb-[25px]">
          Would you share this product to a friend?
        </p>
        <ul className="ml-[20px]">
          {recommendFriend.map((recommend) => (
            <li className="mb-[15px]" key={recommend}>
              <label className="text-sm text-[#6A6C77]">
                <input
                  type="radio"
                  className="mr-5"
                  checked={recommendReview === recommend}
                  onChange={() => handleSeclectChange("recommendReview", recommend)}
                />
                {recommend}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-sm text-[#6B6D76] mt-[10px] mb-[25px]">How easy was it to use?</p>
        <ul className="ml-[20px]">
          {easeOfUse.map((easy, index) => (
            <li className="mb-[15px] flex" key={easy.value}>
              <label className={`text-sm text-[#6A6C77] ${index !== 1 && "w-[156px]"}`}>
                <input
                  type="radio"
                  className="mr-5"
                  checked={easyReview === easy.value}
                  onChange={() => handleSeclectChange("easyReview", easy.value)}
                />
                {easy.name}
              </label>
              <div class="yotpo-field-bars-container">
                <div class="yotpo-size-bars ">
                  <div
                    class={`yotpo-product-related-field-score-bar ${
                      index === 0 ? "yotpo-size-bar-offset" : "yotpo-size-bar-empty"
                    }`}
                  ></div>
                  <div class="yotpo-product-related-field-score-divider"></div>
                  <div class="yotpo-product-related-field-score-bar yotpo-size-bar-empty"></div>
                  <div class="yotpo-product-related-field-score-divider"></div>
                  <div
                    class={`yotpo-product-related-field-score-bar ${
                      index === 1 ? "yotpo-size-bar-fit" : "yotpo-size-bar-empty"
                    }`}
                  ></div>
                  <div class="yotpo-product-related-field-score-divider"></div>
                  <div class="yotpo-product-related-field-score-bar yotpo-size-bar-empty"></div>
                  <div class="yotpo-product-related-field-score-divider"></div>
                  <div
                    class={`yotpo-product-related-field-score-bar ${
                      index === 2 ? "yotpo-size-bar-offset" : "yotpo-size-bar-empty"
                    }`}
                  ></div>
                  <div class="yotpo-clr"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export const recommendFriend = ["Yes, would recommend", "No, would not recommend"];
export const easeOfUse = [
  { value: 1, name: "Easy", selected: false },
  { value: 2, name: "Somewhat Difficult", selected: false },
  { value: 3, name: "Difficult", selected: false },
];
