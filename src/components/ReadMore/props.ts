// @ts-nocheck
export default {
  rows: {
    type: [Number, String],
    default: 1,
  },
  content: String,
  expandText: String,
  collapseText: String,
  dots: {
    type: String,
    default: "…",
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
};
