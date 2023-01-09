import spinnerImg from "../../resources/img/356.gif";
const Spinner = () => {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   style={{ margin: "0 auto", background: "none", display: "block" }}
    //   version="1.0"
    //   width="64px"
    //   height="64px"
    //   viewBox="0 0 128 128"
    //   xmlSpace="preserve"
    // >
    //   <script
    //     type="text/ecmascript"
    //     xlinkHref="//faviconer.net/jscripts/smil.user.js"
    //   />
    //   <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" />
    //   <path
    //     fill="#000000"
    //     id="ball1"
    //     class="cls-1"
    //     d="M67.712,108.82a10.121,10.121,0,1,1-1.26,14.258A10.121,10.121,0,0,1,67.712,108.82Z"
    //   >
    //     <animateTransform
    //       attributeName="transform"
    //       type="rotate"
    //       values="0 64 64;4 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;"
    //       dur="1200ms"
    //       repeatCount="indefinite"
    //     ></animateTransform>
    //   </path>
    //   <path
    //     fill="#000000"
    //     id="ball2"
    //     class="cls-1"
    //     d="M51.864,106.715a10.125,10.125,0,1,1-8.031,11.855A10.125,10.125,0,0,1,51.864,106.715Z"
    //   >
    //     <animateTransform
    //       attributeName="transform"
    //       type="rotate"
    //       values="0 64 64;10 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;"
    //       dur="1200ms"
    //       repeatCount="indefinite"
    //     ></animateTransform>
    //   </path>
    //   <path
    //     fill="#000000"
    //     id="ball3"
    //     class="cls-1"
    //     d="M33.649,97.646a10.121,10.121,0,1,1-11.872,8A10.121,10.121,0,0,1,33.649,97.646Z"
    //   >
    //     <animateTransform
    //       attributeName="transform"
    //       type="rotate"
    //       values="0 64 64;20 64 64;40 64 64;65 64 64;85 64 64;100 64 64;120 64 64;140 64 64;160 64 64;185 64 64;215 64 64;255 64 64;300 64 64;"
    //       dur="1200ms"
    //       repeatCount="indefinite"
    //     ></animateTransform>
    //   </path>
    // </svg>
    <img
      src={spinnerImg}
      alt="spinner"
      style={{ margin: "0 auto", background: "none", display: "block" }}
    />
  );
};

export default Spinner;
