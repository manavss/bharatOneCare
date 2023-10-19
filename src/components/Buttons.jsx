const Buttons = ({ onClick, label, styleClass, type }) => {
  return (
    <button
      onClick={onClick}
      type={type} // Set the type attribute for form submission
      className={styleClass}
    >
      {label}
    </button>
  );
};
export default Buttons;
