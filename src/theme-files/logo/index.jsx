import ImageTag from "../image";
import HeadlessLogo from "../../../public/theme-1/logo.png";
import Link from "../link";

function Logo() {
  return (
    <Link href="/">
      <ImageTag
        className="space-x-16 ml-14"
        src={HeadlessLogo.src}
        width={128}
        height={68}
        layout="contain"
      />
    </Link>
  );
}

export default Logo;
