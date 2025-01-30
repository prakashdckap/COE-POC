import axios from "axios";

export default function VoteUpdate({ votesArr, data, setvotesArr, votes, setVotes }) {
  // Changing value of object in an array
  const handleUpdateValue = (id, vote, bool) => {
    const dupArr = [...votesArr];
    const findObj = dupArr.find((item) => item?.id === id);
    const findIndex = dupArr.indexOf(findObj);
    findObj[vote] = bool;
    dupArr[findIndex] = findObj;
    return dupArr;
  };

  // 1) UP VOTE
  const upVote = (reviewId) => {
    setVotes({ up: votes.up ? 0 : 1, down: 0 });
    axios
      .post(`https://api.yotpo.com/reviews/${reviewId}/vote/up/true`)
      .then((res) => {
        if (res?.data?.response) setvotesArr(handleUpdateValue(reviewId, "upVote", true));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 2) DOWN VOTE
  const downVote = (reviewId) => {
    setVotes({ up: 0, down: votes.down ? 0 : 1 });
    axios
      .post(`https://api.yotpo.com/reviews/${reviewId}/vote/down/true`)
      .then((res) => {
        if (res?.data?.response) setvotesArr(handleUpdateValue(reviewId, "downVote", true));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 1) UP VOTE UNDO
  const upVoteUndo = (reviewId) => {
    axios
      .post(`https://api.yotpo.com/reviews/${reviewId}/vote/up`)
      .then((res) => {
        if (res?.data?.response) setvotesArr(handleUpdateValue(reviewId, "upVote", false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 2) DOWN VOTE UNDO
  const downVoteUndo = (reviewId) => {
    axios
      .post(`https://api.yotpo.com/reviews/${reviewId}/vote/down`)
      .then((res) => {
        if (res?.data?.response) setvotesArr(handleUpdateValue(reviewId, "downVote", false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-end mt-5">
      <button
        onClick={() =>
          votesArr?.find((vote) => vote?.id === data?.id)?.upVote
            ? upVoteUndo(data?.id)
            : upVote(data?.id)
        }
        type="button"
        className="border border-[#000] text-sm text-[#716C8A] py-1 px-2 ml-4"
      >
        HELPFUL{" "}
        {votesArr?.find((vote) => vote?.id === data?.id)?.upVote
          ? data?.votes_up + 1
          : data?.votes_up + votes?.up}
      </button>
      <button
        onClick={() =>
          votesArr?.find((vote) => vote?.id === data?.id)?.downVote
            ? downVoteUndo(data?.id)
            : downVote(data?.id)
        }
        type="button"
        className="border border-[#000] text-sm text-[#716C8A] py-1 px-2 ml-4"
      >
        NOT HELPFUL{" "}
        {votesArr?.find((vote) => vote?.id === data?.id)?.downVote
          ? data?.votes_down + 1
          : data?.votes_down + votes?.down}
      </button>
    </div>
  );
}
