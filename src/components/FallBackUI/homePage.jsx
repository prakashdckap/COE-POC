const loadingSvg = (
  <svg
    className="w-10 h-10 text-gray-200"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 18"
  >
    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
  </svg>
);

export const SectionSckeleton = () => {
  return (
    <div className="container px-0 py-2 md:px-[10px] mx-auto -mt-[20px]">
      <div className="mx-auto py-[20px] lg:py-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[20px] md:gap-y-0 md:gap-x-[20px]">
          <div className="relative">
            <div className="inset-0">
              <div
                role="status"
                className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
              >
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded">
                  {loadingSvg}
                </div>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="inset-0">
              <div
                role="status"
                className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
              >
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded">
                  {loadingSvg}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomeSliderSckeleton = () => {
  return (
    <div className="container px-0 py-2 md:px-[10px] mx-auto -mt-[20px]">
      <div className="home-main-slider">
        <div
          role="status"
          className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
          <div className="flex items-center justify-center w-[100vw] h-[60vh] bg-gray-300 rounded">
            {loadingSvg}
          </div>
        </div>
      </div>
    </div>
  );
};
