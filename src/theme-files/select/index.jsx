import PropTypes from "prop-types";
import constants from "../../helper/constant";
import Label from "../label";

const { theme, HEADLESS_SOLUTION_THEME } = constants;

function Select({
  data,
  defaultValue,
  defaultTitle,
  children,
  type,
  themeName,
  className,
  name,
  onChange,
  ...props
}) {
  return (
    <div style={{ paddingLeft: 0 }}>
      <Label htmlFor="mobile" className="block text-xs font-semibold text-skin-base capitalize">
        {children}
        <select
          onChange={onChange}
          className={`${themeName || theme[type]} ${className || ""}`}
          name={name}
          {...props}
        >
          <option value="">{defaultTitle}</option>
          {data.map((val) => {
            return (
              <option value={val.value} key={val.displayName}>
                {val.displayName}
              </option>
            );
          })}
        </select>
      </Label>
    </div>
  );
}

Select.propTypes = {
  children: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.number,
  themeName: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  data: PropTypes.string,
  defaultTitle: PropTypes.string,
};

Select.defaultProps = {
  type: HEADLESS_SOLUTION_THEME,
  themeName: theme[HEADLESS_SOLUTION_THEME],
  className: "",
  name: "",
  children: "",
  defaultValue: "",
  data: [],
  defaultTitle: "",
};

export default Select;
