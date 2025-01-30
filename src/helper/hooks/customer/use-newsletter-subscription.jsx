import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { SET_NEWSLETTER_SUBSCRIPTION } from "../../../redux/actions";
import NEWSLETTER from "../../../components/account/graphql/mutation/newsletter-subscription";

function useNewsletterSubscription() {
  const dispatch = useDispatch();
  const [newsletterSubscription, { loading: newsletterSubscriptionLoading }] =
    useMutation(NEWSLETTER);

  const handleNewsletterSubscription = (data, setEnabled) => {
    newsletterSubscription({
      skip: !data,
      variables: data,
    })
      .then((res) => {
        if (!res?.errors?.length) {
          dispatch(SET_NEWSLETTER_SUBSCRIPTION(res.data.updateCustomer.isSubscribed));
          setEnabled(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { handleNewsletterSubscription, newsletterSubscriptionLoading };
}

export default useNewsletterSubscription;
