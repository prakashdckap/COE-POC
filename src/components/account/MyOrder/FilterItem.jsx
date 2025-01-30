import { Remove } from "../AccountAssets/Asset";

export default function FilterItem({ handleRemove, type, title, text }) {
  return (
    <li className="float-left list-none mb-[5px] mr-[14px]">
      <span
        className="inline-block font-bold px-[3px] cursor-pointer leading-[1.35]"
        onClick={() => handleRemove(type)}
      >
        <Remove />
      </span>
      <span className="font-bold text-[13px] leading-[1.35] px-[3px]">{title}</span>
      <span className="text-[13px] leading-[1.35] px-[3px]">{text}</span>
    </li>
  );
}

export function DoubleFilterItem({
  handleRemove,
  type,
  title,
  firstTitle,
  secondTitle,
  firstText,
  secondText,
}) {
  return (
    <li className="float-left list-none mb-[5px] mr-[14px]">
      <span
        className="inline-block font-bold px-[3px] cursor-pointer leading-[1.35]"
        onClick={() => handleRemove(type)}
      >
        <Remove />
      </span>

      <span className="font-bold text-[13px] leading-[1.35] px-[3px]">{title} </span>
      <span className="text-[13px] leading-[1.35] ">
        {firstText && (
          <>
            <span className="text-[13px] leading-[1.35] px-[3px]">{firstTitle} </span>
            <span>{firstText}</span>
          </>
        )}
      </span>
      <span className="text-[13px] leadin g-[1.35]">
        {secondText && (
          <>
            <span className="text-[13px] leading-[1.35] px-[3px]"> {secondTitle} </span>
            <span>{secondText}</span>
          </>
        )}
      </span>
    </li>
  );
}
