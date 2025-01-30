import Paragraph from "../../../theme-files/paragraph";
import SubHeading from "../../../theme-files/sub-heading";

export default function DisplayAddress({ address, type = "shipping" }) {
  return (
    <div className="w-full flex items-center justify-between pt-0 pb-3 md:py-6 space-x-6">
      <div className="flex-1 truncate">
        <div className="flex items-center space-x-3">
          <SubHeading className="text-gray-900 text-sm font-medium truncate uppercase">
            Default {type} Address
          </SubHeading>
        </div>
        {address?.firstName ? (
          <div className="mt-1 text-sm truncate">
            <Paragraph className="mt-1 text-black-900 text-sm font-light">
              {address?.firstName} {address?.lastName}
            </Paragraph>
            <Paragraph className="text-black-900 text-sm font-light">
              {address?.street[0]}, {address?.street[1]}
            </Paragraph>
            <Paragraph className="text-black-900 text-sm font-light">
              {address?.city}, {address?.region?.region}, {address?.postcode}
            </Paragraph>
            <Paragraph className="text-black-900 text-sm font-light">{address?.country}</Paragraph>
            <Paragraph className="text-black-900 text-sm font-light">
              T: {address?.telephone}
            </Paragraph>
          </div>
        ) : (
          <Paragraph className="text-black-900 text-sm font-light mt-2 whitespace-pre-line">
            You have not set a default {type} address.
          </Paragraph>
        )}
      </div>
    </div>
  );
}
