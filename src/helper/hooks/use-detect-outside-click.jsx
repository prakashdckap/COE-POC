import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { SHOW_CART, SHOW_USER } from "../../redux/actions";

export default function useOnClickOutside(cartStatus, isCart) {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const keyboardEscapeEvent = (event) => {
    if (event.key === "Escape") {
      setShowMenu(false);
    }
  };

  const handleClickOutside = (event) => {
    if (showMenu && ref.current && !ref.current.contains(event.target)) {
      setShowMenu(false);
      if (isCart === "dislayCart") dispatch(SHOW_CART(false));
      else if (isCart === "showUser") dispatch(SHOW_USER(false));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyboardEscapeEvent);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", keyboardEscapeEvent);
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return { ref, showMenu, setShowMenu };
}
