/* @ds-bundle: {"format":3,"namespace":"ReaderKit_4d7f19","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/core/Button.jsx":"a87c10adcab1","components/core/Tag.jsx":"7e3cfe6861ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ReaderKit_4d7f19 = window.ReaderKit_4d7f19 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function Button({
  label,
  variant = 'primary',
  disabled = false,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: 'ds-button ' + variant,
    disabled: disabled,
    onClick: onClick
  }, label);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  label,
  tone = 'accent'
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: 'ds-tag ' + tone
  }, label);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Tag = __ds_scope.Tag;

})();
