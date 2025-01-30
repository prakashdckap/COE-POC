export default function HeaderFallBackUi() {
  return (
    <div className="bg-skin-inverted p-[16px] w-full">
      <div className="md:w-full md:relative">
        <div className="text-center">
          <div className="hidden md:flex elementvape-logo items-center">
            <a href="/">
              <DescktopLogo />
            </a>
          </div>

          <div className="flex md:hidden items-center justify-center">
            <a href="/">
              <MobileLogo />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const HeaderCategorySckeleton = () => {
  const textLoader = (
    <div role="status" className="max-w-sm animate-pulse px-6">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-4 flex"></div>
    </div>
  );

  const textSckeleton = [
    textLoader,
    textLoader,
    textLoader,
    textLoader,
    textLoader,
    textLoader,
    textLoader,
    textLoader,
  ];

  return (
    <div className="z-50 container mx-auto hidden md:block">
      <div className="bg-white">
        <div className="border-t-[1px] border-[#aaa] pt-[15px] pb-[20px] flex justify-center items-center px-[12px]">
          <div className="open-tab hidden md:flex md:items-center md:justify-center p-0 m-0">
            {textSckeleton}
          </div>
        </div>
      </div>
    </div>
  );
};

export const DescktopLogo = () => {
  return (
    <img className="object-contain" alt="logo" src="/headless-logo.png" height={70} width={300} />
  );
};

export const MobileLogo = () => {
  return (
    <img className="object-contain" alt="logo" src="/headless-logo.png" height={45} width={186} />
  );
};
