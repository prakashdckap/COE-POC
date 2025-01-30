import PropTypes from "prop-types";
import constants from "../../helper/constant";
import Label from "../label";

const { theme, HEADLESS_SOLUTION_THEME } = constants;

function InputText({
  children,
  type,
  themeName,
  className,
  name,
  onChange,
  placeholder,
  ...props
}) {
  return (
    <div>
      <Label htmlFor="mobile" className="block text-xs font-semibold text-skin-base capitalize">
        {children}
        <input
          type="text"
          placeholder={placeholder}
          className={`${themeName || theme[type]} ${className || ""}`}
          name={name}
          {...props}
          onChange={onChange}
        />
      </Label>
    </div>
  );
}

InputText.propTypes = {
  children: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.number,
  themeName: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InputText.defaultProps = {
  type: HEADLESS_SOLUTION_THEME,
  themeName: theme[HEADLESS_SOLUTION_THEME],
  className: "",
  name: "",
  children: "",
  placeholder: "",
};

export default InputText;
