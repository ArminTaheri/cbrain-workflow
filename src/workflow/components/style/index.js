import nodeStyles from "./node-styles";
import connectionStyles from "./connection-styles";

export default {
  graphDomain: { x: [0, 1], y: [0, 1] },
  minPinSpacing: 8,
  pinSize: 8,
  pinPadding: 15,
  sizes: {
    small: { width: 64, height: 64 },
    medium: { width: 128, height: 64 },
    large: { width: 128, height: 128 }
  },
  textStyle: {
    nodeName: { height: 6 },
    ioPinName: { height: 6 }
  },
  nodeStyles,
  connectionStyles
};
