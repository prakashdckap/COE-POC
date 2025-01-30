import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { TwitterShareButton, TwitterIcon } from "react-twitter-embed";
import RewardsMenu from "./rewards-menu";
import { AxiosGraphQL } from "../../../helper/axios";

export default function MyAccount() {
  const customerToken = useSelector((state) => state.customerToken);
  const [urlLink, seturlLink] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getUrl = async () => {
      setloading(true);
      const response = await AxiosGraphQL("get-invitation-url", "", customerToken);
      if (response && !response?.errors?.length) {
        seturlLink(
          `${window?.location?.protocol}//www.${window?.location?.host}/r/${response?.getInivationUrl}/`
        );
        setloading(false);
      } else {
        setloading(false);
      }
    };

    getUrl();
  }, []);

  return (
    <>
      <RewardsMenu />
      <div
        className={`${
          loading ? "opacity-40 pointer-events-none" : null
        } py-6 px-4 sm:p-6 lg:pb-8 border shadow`}
      >
        <div>
          <h2 className="text-[26px] leading-6 font-sans text-skin-secondary mb-4">
            My Reward Points
          </h2>
          <span className="text-[16px] text-[#282828] font-sans font-light uppercase">
            Share the Referral Link in the Social Media
          </span>
          <hr className="mt-3 mb-3" />
          <div className="block-content">
            <div className="block-rewards-referral-list">
              <div className="rewards-social-buttons flex">
                <div className="fb">
                  <div
                    className="fb-like fb_iframe_widget"
                    data-href="https://www.elementvape.com/r/o3Yjxni1/"
                    data-layout="button"
                    data-action="like"
                    data-show-faces="false"
                    data-share="false"
                    data-font="arial"
                    data-width="61"
                    data-height="20"
                    data-colorscheme="light"
                    fb-xfbml-state="rendered"
                    fb-iframe-plugin-query="action=like&amp;app_id=&amp;color_scheme=light&amp;container_width=0&amp;font=arial&amp;height=20&amp;href=https%3A%2F%2Fwww.elementvape.com%2Fr%2Fo3Yjxni1%2F&amp;layout=button&amp;locale=en_US&amp;sdk=joey&amp;share=false&amp;show_faces=false&amp;width=61"
                  >
                    <iframe
                      name="f970581da95c251f7"
                      width="61px"
                      height="20px"
                      data-testid="fb:like Facebook Social Plugin"
                      title="fb:like Facebook Social Plugin"
                      frameborder="0"
                      allowtransparency="true"
                      allowfullscreen="true"
                      scrolling="no"
                      allow="encrypted-media"
                      src="https://www.facebook.com/plugins/like.php?action=like&amp;app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df4272dc0c69c71c91%26domain%3Dwww.elementvape.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwww.elementvape.com%252Ff5b131d2e70da9244%26relation%3Dparent.parent&amp;color_scheme=light&amp;container_width=0&amp;font=arial&amp;height=20&amp;href=https%3A%2F%2Fwww.elementvape.com%2Fr%2Fo3Yjxni1%2F&amp;layout=button&amp;locale=en_US&amp;sdk=joey&amp;share=false&amp;show_faces=false&amp;width=61"
                      className=""
                    ></iframe>
                  </div>
                </div>
                <div>
                  <div
                    className="fb-share-button fb_iframe_widget"
                    data-href="https://www.elementvape.com/r/o3Yjxni1/"
                    data-layout="button"
                    fb-xfbml-state="rendered"
                    fb-iframe-plugin-query="app_id=&amp;container_width=0&amp;href=https%3A%2F%2Fwww.elementvape.com%2Fr%2Fo3Yjxni1%2F&amp;layout=button&amp;locale=en_US&amp;sdk=joey"
                  >
                    <iframe
                      name="f6e8fdbfc4d28e878"
                      width="70px"
                      height="20px"
                      data-testid="fb:share_button Facebook Social Plugin"
                      title="fb:share_button Facebook Social Plugin"
                      frameborder="0"
                      allowtransparency="true"
                      allowfullscreen="true"
                      scrolling="no"
                      allow="encrypted-media"
                      src="https://www.facebook.com/plugins/share_button.php?app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df09b3fb5c3b9fa81f%26domain%3Dwww.elementvape.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwww.elementvape.com%252Ff5b131d2e70da9244%26relation%3Dparent.parent&amp;container_width=0&amp;href=https%3A%2F%2Fwww.elementvape.com%2Fr%2Fo3Yjxni1%2F&amp;layout=button&amp;locale=en_US&amp;sdk=joey"
                    ></iframe>
                  </div>
                </div>
                <div className="tw">
                  <iframe
                    id="twitter-widget-0"
                    scrolling="no"
                    frameborder="0"
                    width="100px"
                    height="20px"
                    allowtransparency="true"
                    allowfullscreen="true"
                    className="twitter-share-button twitter-share-button-rendered twitter-tweet-button"
                    title="X Post Button"
                    src="https://platform.twitter.com/widgets/tweet_button.2f70fb173b9000da126c79afe2098f02.en.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;original_referer=https%3A%2F%2Fwww.elementvape.com%2Frewards%2Faccount%2Fshare%2F&amp;size=m&amp;text=Check%20this%20out!&amp;time=1728122186210&amp;type=share&amp;url=https%3A%2F%2Fwww.elementvape.com%2Fr%2Fo3Yjxni1%2F"
                    data-url="https://www.elementvape.com/r/o3Yjxni1/"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <TwitterShareButton
              // onLoad={() => noRefCheck()}
              options={{
                buttonHashtag: undefined,
                screenName: undefined,
                text: "Tweet on Twitter",
                via: "elementvape",
              }}
              url="https://www.elementvape.com"
            />
          </div> */}
          <span className="font-bold text-[16px] mt-[25px] inline-block text-[#282828] font-sans uppercase">
            You may send this link in your Messages to anyone
          </span>
          <hr className="mt-3 mb-3" />
          <span className="font-semibold rewards-referral-link text-[#282828] font-sans">
            {urlLink}
          </span>
        </div>
      </div>
    </>
  );
}

