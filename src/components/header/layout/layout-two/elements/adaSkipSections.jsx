export default function AdaSkipContent() {
  return (
    <>
      <div id="skiptocontent" className="">
        <a href="#main_content">Skip to content</a>
        <a href="#quick_search">Jump to search</a>
        <a href="#main_navigation">Jump to navigation</a>
      </div>
    </>
  );
}

export const handleFocusOnTopPage = () => {
  const element = document.getElementById("skiptocontent");
  if (element) {
    element.focus();
  }
};

export const handleFocusOnId = (focus) => {
  const element = document.getElementById(focus || "skiptocontent");
  if (element) {
    element.focus();
  }
};
