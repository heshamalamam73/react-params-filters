const Spacer: React.FC<{ height?: number; width?: number }> = ({
  width,
  height
}) => <div style={{ height: height, width: width }}></div>;

export default Spacer;
