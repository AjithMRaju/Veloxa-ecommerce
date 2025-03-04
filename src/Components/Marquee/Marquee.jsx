import Marquee from "react-fast-marquee";

const MarqueeC = () => {
  return (
    <>
      <Marquee speed={170}>
        I can be a React component, multiple React components, or just some
        text.
      </Marquee>
      {/* <Marquee>*</Marquee> */}
      <Marquee  speed={170}>
        I can be a React component, multiple React components, or just some
        text.
      </Marquee>
    </>
  );
};

export default MarqueeC;
