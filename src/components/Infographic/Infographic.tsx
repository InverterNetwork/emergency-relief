import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import cx from 'classnames';
import { useOnClickOutside } from 'usehooks-ts';

// @ts-ignore
import ModalImage from 'react-modal-image';

import Card from '@/components/Infographic/Card';

const Infographic = () => {
  const canvasRef = useRef(null);

  const [selectedCity, setSelectedCity] = useState<
    'Kahramanmaraş' | 'Gaziantep' | 'All' | null
  >(null);

  const handleClickOutside = () => {
    setSelectedCity(null);
  };

  const handleClick = (city: 'Kahramanmaraş' | 'Gaziantep') => {
    if (selectedCity === city) {
      return setSelectedCity(null);
    }

    setSelectedCity(city);
  };

  useOnClickOutside(canvasRef, handleClickOutside);

  return (
    <>
      <div className="flex justify-center relative py-4 mt-14">
        <AnimatePresence>
          {(selectedCity === 'Kahramanmaraş' || selectedCity === 'All') && (
            <motion.div
              className="absolute left-0 top-0"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <Card magnitude={7.7} time="4:17 AM" duration="100 seconds" />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {(selectedCity === 'Gaziantep' || selectedCity === 'All') && (
            <motion.div
              className="absolute right-0 bottom-0"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              <Card magnitude={7.6} time="1:24 PM" duration="45 seconds" />
            </motion.div>
          )}
        </AnimatePresence>
        <svg
          ref={canvasRef}
          width="416"
          height="561"
          viewBox="0 0 416 561"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M242.179 10.0189L229.281 32.3751L231.861 49.1422H235.73L243.899 47.4225L248.198 46.9926L281.732 54.3013L310.107 71.0684L325.585 75.7976L343.211 83.9662L353.96 103.313L352.67 114.921L340.202 147.595L338.912 156.194L334.613 163.073L331.173 166.512L326.014 175.11L314.406 216.813L305.378 233.58L294.63 247.338L282.162 258.516L273.133 269.694V286.461L280.872 299.359L294.2 304.088L318.706 319.136L318.276 327.734L319.996 335.903L316.986 348.8L307.528 355.249L293.34 354.82L279.153 356.539L249.058 367.287L221.113 372.017L208.645 378.465L188.438 399.962L171.241 394.373L164.792 369.007L153.614 362.128L143.296 376.746L116.211 389.214L106.322 374.596L94.2844 363.418L86.5456 357.829L77.947 355.679L53.4415 360.409L44.843 363.848L37.5342 365.138L33.6647 360.838L28.0757 362.988L25.9261 364.278L24.6364 366.857L22.4868 367.287L13.0283 356.109L12.1684 337.193L9.58898 333.753L6.57945 330.744L4 322.575L5.71955 313.977L12.1684 307.098L16.8978 298.929L17.3276 276.573L23.3467 268.404L27.6459 266.255L34.9545 258.946L35.8144 247.338L28.5056 229.711L27.2158 216.383L27.6459 207.785L30.2254 188.868L37.1041 170.811L48.2823 120.08L55.161 102.453L67.629 90.4151L75.7974 81.8166L83.1062 71.4984L100.303 51.2918L107.182 39.6838L110.191 24.6364L114.491 16.0379L121.8 11.3087L151.465 4L180.699 7.86931L186.288 11.7386L191.877 14.3182L242.179 10.0189Z"
            fill="#B42318"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cx('hover:fill-red-800 cursor-pointer', {
              'fill-red-800': selectedCity === 'Kahramanmaraş',
            })}
            onClick={() => handleClick('Kahramanmaraş')}
          />
          <path
            d="M411.57 339.776L407.701 340.636L404.262 340.206H400.392L396.953 342.785L387.065 355.253L379.326 362.992L377.176 366.861L375.456 373.74L370.727 377.609L369.438 379.759L366.858 390.077L370.297 392.227L372.877 395.236L374.597 399.536V405.555H373.307L371.587 402.115L369.438 401.685L367.718 403.835L366.858 408.564L367.718 412.863L369.438 416.733L373.307 422.752L374.597 426.191L375.027 428.771L374.597 435.649L373.307 443.818V447.257L376.316 450.267L378.896 448.547L381.045 449.837L383.195 452.417L385.345 453.706L387.065 453.276L392.654 450.697L395.233 450.267L397.813 451.557L397.383 454.566L394.803 461.445V465.744L395.233 468.324L398.673 472.193L404.691 477.782L405.551 479.932V486.811L406.841 492.4L410.71 496.699L412 499.278L409.421 500.138L407.271 501.858L406.841 505.297L407.271 509.167L408.561 511.746L404.691 514.326L398.242 516.046L362.129 532.813L325.155 540.551L311.398 546.57L295.49 556.889L276.574 540.121L255.937 528.513L239.6 519.485L232.721 524.214L223.263 512.606L204.776 493.689L187.579 482.081L172.531 479.072L165.653 463.165L157.484 458.865L150.605 464.455L148.026 483.371L132.978 493.689L114.491 502.288L102.454 513.896L100.304 511.316L96.8646 510.886L93.855 508.737L92.1355 502.718L88.2661 499.278L70.2091 491.11L55.5918 476.492L61.1808 466.174L69.3492 458.435L85.2565 438.229L97.2944 414.153L105.893 400.825L116.211 389.217L143.297 376.75L153.615 362.132L164.793 369.011L171.242 394.377L188.439 399.966L208.645 378.469L221.113 372.02L249.058 367.291L279.153 356.543L293.341 354.823L307.528 355.253L316.987 348.804L319.996 335.907L318.276 327.738L318.706 319.14L343.212 313.98L367.718 314.41L393.943 324.299L411.57 339.776Z"
            fill="#B42318"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cx('hover:fill-red-800 cursor-pointer', {
              'fill-red-800': selectedCity === 'Gaziantep',
            })}
            onClick={() => handleClick('Gaziantep')}
          />

          <g>
            <path
              d="M115.011 217V205.364H117.472V210.494H117.625L121.812 205.364H124.761L120.443 210.574L124.812 217H121.869L118.682 212.216L117.472 213.693V217H115.011Z"
              fill="white"
            />
            <path
              d="M128.486 217.165C127.929 217.165 127.433 217.068 126.997 216.875C126.562 216.678 126.217 216.388 125.963 216.006C125.713 215.619 125.588 215.138 125.588 214.562C125.588 214.078 125.677 213.67 125.855 213.341C126.033 213.011 126.276 212.746 126.582 212.545C126.889 212.345 127.238 212.193 127.628 212.091C128.022 211.989 128.435 211.917 128.866 211.875C129.374 211.822 129.783 211.773 130.094 211.727C130.404 211.678 130.63 211.606 130.77 211.511C130.91 211.417 130.98 211.277 130.98 211.091V211.057C130.98 210.697 130.866 210.419 130.639 210.222C130.416 210.025 130.098 209.926 129.685 209.926C129.249 209.926 128.902 210.023 128.645 210.216C128.387 210.405 128.217 210.644 128.134 210.932L125.895 210.75C126.009 210.22 126.232 209.761 126.565 209.375C126.899 208.985 127.329 208.686 127.855 208.477C128.385 208.265 128.999 208.159 129.696 208.159C130.181 208.159 130.645 208.216 131.088 208.33C131.535 208.443 131.931 208.619 132.276 208.858C132.624 209.097 132.899 209.403 133.099 209.778C133.3 210.15 133.401 210.595 133.401 211.114V217H131.105V215.79H131.037C130.897 216.062 130.709 216.303 130.474 216.511C130.24 216.716 129.957 216.877 129.628 216.994C129.298 217.108 128.918 217.165 128.486 217.165ZM129.179 215.494C129.535 215.494 129.849 215.424 130.122 215.284C130.395 215.14 130.609 214.947 130.764 214.705C130.919 214.462 130.997 214.187 130.997 213.881V212.955C130.921 213.004 130.817 213.049 130.685 213.091C130.556 213.129 130.41 213.165 130.247 213.199C130.084 213.229 129.921 213.258 129.759 213.284C129.596 213.307 129.448 213.328 129.315 213.347C129.031 213.388 128.783 213.455 128.571 213.545C128.359 213.636 128.194 213.759 128.077 213.915C127.959 214.066 127.901 214.256 127.901 214.483C127.901 214.812 128.02 215.064 128.259 215.239C128.501 215.409 128.808 215.494 129.179 215.494Z"
              fill="white"
            />
            <path
              d="M137.699 211.955V217H135.278V205.364H137.631V209.812H137.733C137.93 209.297 138.248 208.894 138.687 208.602C139.127 208.307 139.678 208.159 140.341 208.159C140.947 208.159 141.475 208.292 141.926 208.557C142.381 208.818 142.733 209.195 142.983 209.687C143.237 210.176 143.362 210.761 143.358 211.443V217H140.937V211.875C140.941 211.337 140.805 210.919 140.528 210.619C140.256 210.32 139.873 210.17 139.381 210.17C139.051 210.17 138.759 210.241 138.506 210.381C138.256 210.521 138.059 210.725 137.915 210.994C137.775 211.259 137.703 211.58 137.699 211.955Z"
              fill="white"
            />
            <path
              d="M145.263 217V208.273H147.609V209.795H147.7C147.859 209.254 148.126 208.845 148.501 208.568C148.876 208.288 149.308 208.148 149.797 208.148C149.918 208.148 150.049 208.155 150.189 208.17C150.329 208.186 150.452 208.206 150.558 208.233V210.381C150.445 210.347 150.287 210.316 150.087 210.29C149.886 210.263 149.702 210.25 149.535 210.25C149.179 210.25 148.861 210.328 148.581 210.483C148.304 210.634 148.085 210.847 147.922 211.119C147.763 211.392 147.683 211.706 147.683 212.062V217H145.263Z"
              fill="white"
            />
            <path
              d="M154.048 217.165C153.491 217.165 152.995 217.068 152.56 216.875C152.124 216.678 151.779 216.388 151.526 216.006C151.276 215.619 151.151 215.138 151.151 214.562C151.151 214.078 151.24 213.67 151.418 213.341C151.596 213.011 151.838 212.746 152.145 212.545C152.452 212.345 152.8 212.193 153.19 212.091C153.584 211.989 153.997 211.917 154.429 211.875C154.937 211.822 155.346 211.773 155.656 211.727C155.967 211.678 156.192 211.606 156.332 211.511C156.473 211.417 156.543 211.277 156.543 211.091V211.057C156.543 210.697 156.429 210.419 156.202 210.222C155.978 210.025 155.66 209.926 155.247 209.926C154.812 209.926 154.465 210.023 154.207 210.216C153.95 210.405 153.779 210.644 153.696 210.932L151.457 210.75C151.571 210.22 151.794 209.761 152.128 209.375C152.461 208.985 152.891 208.686 153.418 208.477C153.948 208.265 154.562 208.159 155.259 208.159C155.743 208.159 156.207 208.216 156.651 208.33C157.098 208.443 157.493 208.619 157.838 208.858C158.187 209.097 158.461 209.403 158.662 209.778C158.863 210.15 158.963 210.595 158.963 211.114V217H156.668V215.79H156.599C156.459 216.062 156.272 216.303 156.037 216.511C155.802 216.716 155.52 216.877 155.19 216.994C154.861 217.108 154.48 217.165 154.048 217.165ZM154.741 215.494C155.098 215.494 155.412 215.424 155.685 215.284C155.957 215.14 156.171 214.947 156.327 214.705C156.482 214.462 156.56 214.187 156.56 213.881V212.955C156.484 213.004 156.38 213.049 156.247 213.091C156.118 213.129 155.973 213.165 155.81 213.199C155.647 213.229 155.484 213.258 155.321 213.284C155.158 213.307 155.01 213.328 154.878 213.347C154.594 213.388 154.346 213.455 154.134 213.545C153.921 213.636 153.757 213.759 153.639 213.915C153.522 214.066 153.463 214.256 153.463 214.483C153.463 214.812 153.582 215.064 153.821 215.239C154.063 215.409 154.37 215.494 154.741 215.494Z"
              fill="white"
            />
            <path
              d="M160.841 217V208.273H163.148V209.812H163.25C163.432 209.301 163.735 208.898 164.159 208.602C164.583 208.307 165.091 208.159 165.682 208.159C166.28 208.159 166.79 208.309 167.21 208.608C167.631 208.903 167.911 209.305 168.051 209.812H168.142C168.32 209.312 168.642 208.913 169.108 208.614C169.578 208.311 170.133 208.159 170.773 208.159C171.587 208.159 172.248 208.419 172.756 208.937C173.267 209.453 173.523 210.184 173.523 211.131V217H171.108V211.608C171.108 211.123 170.979 210.759 170.722 210.517C170.464 210.275 170.142 210.153 169.756 210.153C169.316 210.153 168.973 210.294 168.727 210.574C168.481 210.85 168.358 211.216 168.358 211.67V217H166.011V211.557C166.011 211.129 165.888 210.788 165.642 210.534C165.4 210.28 165.08 210.153 164.682 210.153C164.413 210.153 164.17 210.222 163.955 210.358C163.742 210.491 163.574 210.678 163.449 210.92C163.324 211.159 163.261 211.439 163.261 211.761V217H160.841Z"
              fill="white"
            />
            <path
              d="M177.923 217.165C177.366 217.165 176.87 217.068 176.435 216.875C175.999 216.678 175.654 216.388 175.401 216.006C175.151 215.619 175.026 215.138 175.026 214.562C175.026 214.078 175.115 213.67 175.293 213.341C175.471 213.011 175.713 212.746 176.02 212.545C176.327 212.345 176.675 212.193 177.065 212.091C177.459 211.989 177.872 211.917 178.304 211.875C178.812 211.822 179.221 211.773 179.531 211.727C179.842 211.678 180.067 211.606 180.207 211.511C180.348 211.417 180.418 211.277 180.418 211.091V211.057C180.418 210.697 180.304 210.419 180.077 210.222C179.853 210.025 179.535 209.926 179.122 209.926C178.687 209.926 178.34 210.023 178.082 210.216C177.825 210.405 177.654 210.644 177.571 210.932L175.332 210.75C175.446 210.22 175.669 209.761 176.003 209.375C176.336 208.985 176.766 208.686 177.293 208.477C177.823 208.265 178.437 208.159 179.134 208.159C179.618 208.159 180.082 208.216 180.526 208.33C180.973 208.443 181.368 208.619 181.713 208.858C182.062 209.097 182.336 209.403 182.537 209.778C182.738 210.15 182.838 210.595 182.838 211.114V217H180.543V215.79H180.474C180.334 216.062 180.147 216.303 179.912 216.511C179.677 216.716 179.395 216.877 179.065 216.994C178.736 217.108 178.355 217.165 177.923 217.165ZM178.616 215.494C178.973 215.494 179.287 215.424 179.56 215.284C179.832 215.14 180.046 214.947 180.202 214.705C180.357 214.462 180.435 214.187 180.435 213.881V212.955C180.359 213.004 180.255 213.049 180.122 213.091C179.993 213.129 179.848 213.165 179.685 213.199C179.522 213.229 179.359 213.258 179.196 213.284C179.033 213.307 178.885 213.328 178.753 213.347C178.469 213.388 178.221 213.455 178.009 213.545C177.796 213.636 177.632 213.759 177.514 213.915C177.397 214.066 177.338 214.256 177.338 214.483C177.338 214.812 177.457 215.064 177.696 215.239C177.938 215.409 178.245 215.494 178.616 215.494Z"
              fill="white"
            />
            <path
              d="M187.136 211.955V217H184.716V208.273H187.023V209.812H187.125C187.318 209.305 187.642 208.903 188.097 208.608C188.551 208.309 189.102 208.159 189.75 208.159C190.356 208.159 190.884 208.292 191.335 208.557C191.786 208.822 192.136 209.201 192.386 209.693C192.636 210.182 192.761 210.765 192.761 211.443V217H190.341V211.875C190.345 211.341 190.208 210.924 189.932 210.625C189.655 210.322 189.275 210.17 188.79 210.17C188.464 210.17 188.176 210.241 187.926 210.381C187.68 210.521 187.487 210.725 187.347 210.994C187.21 211.259 187.14 211.58 187.136 211.955Z"
              fill="white"
            />
            <path
              d="M194.669 217V208.273H196.976V209.812H197.078C197.26 209.301 197.563 208.898 197.987 208.602C198.411 208.307 198.919 208.159 199.51 208.159C200.108 208.159 200.618 208.309 201.038 208.608C201.459 208.903 201.739 209.305 201.879 209.812H201.97C202.148 209.312 202.47 208.913 202.936 208.614C203.406 208.311 203.961 208.159 204.601 208.159C205.415 208.159 206.076 208.419 206.584 208.937C207.095 209.453 207.351 210.184 207.351 211.131V217H204.936V211.608C204.936 211.123 204.807 210.759 204.55 210.517C204.292 210.275 203.97 210.153 203.584 210.153C203.144 210.153 202.802 210.294 202.555 210.574C202.309 210.85 202.186 211.216 202.186 211.67V217H199.839V211.557C199.839 211.129 199.716 210.788 199.47 210.534C199.228 210.28 198.908 210.153 198.51 210.153C198.241 210.153 197.999 210.222 197.783 210.358C197.571 210.491 197.402 210.678 197.277 210.92C197.152 211.159 197.089 211.439 197.089 211.761V217H194.669Z"
              fill="white"
            />
            <path
              d="M211.751 217.165C211.195 217.165 210.698 217.068 210.263 216.875C209.827 216.678 209.482 216.388 209.229 216.006C208.979 215.619 208.854 215.138 208.854 214.562C208.854 214.078 208.943 213.67 209.121 213.341C209.299 213.011 209.541 212.746 209.848 212.545C210.155 212.345 210.503 212.193 210.893 212.091C211.287 211.989 211.7 211.917 212.132 211.875C212.64 211.822 213.049 211.773 213.359 211.727C213.67 211.678 213.895 211.606 214.035 211.511C214.176 211.417 214.246 211.277 214.246 211.091V211.057C214.246 210.697 214.132 210.419 213.905 210.222C213.681 210.025 213.363 209.926 212.95 209.926C212.515 209.926 212.168 210.023 211.91 210.216C211.653 210.405 211.482 210.644 211.399 210.932L209.16 210.75C209.274 210.22 209.498 209.761 209.831 209.375C210.164 208.985 210.594 208.686 211.121 208.477C211.651 208.265 212.265 208.159 212.962 208.159C213.446 208.159 213.911 208.216 214.354 208.33C214.801 208.443 215.196 208.619 215.541 208.858C215.89 209.097 216.164 209.403 216.365 209.778C216.566 210.15 216.666 210.595 216.666 211.114V217H214.371V215.79H214.303C214.162 216.062 213.975 216.303 213.74 216.511C213.505 216.716 213.223 216.877 212.893 216.994C212.564 217.108 212.183 217.165 211.751 217.165ZM212.445 215.494C212.801 215.494 213.115 215.424 213.388 215.284C213.66 215.14 213.875 214.947 214.03 214.705C214.185 214.462 214.263 214.187 214.263 213.881V212.955C214.187 213.004 214.083 213.049 213.95 213.091C213.821 213.129 213.676 213.165 213.513 213.199C213.35 213.229 213.187 213.258 213.024 213.284C212.861 213.307 212.714 213.328 212.581 213.347C212.297 213.388 212.049 213.455 211.837 213.545C211.625 213.636 211.46 213.759 211.342 213.915C211.225 214.066 211.166 214.256 211.166 214.483C211.166 214.812 211.286 215.064 211.524 215.239C211.767 215.409 212.073 215.494 212.445 215.494Z"
              fill="white"
            />
            <path
              d="M218.544 217V208.273H220.891V209.795H220.982C221.141 209.254 221.408 208.845 221.783 208.568C222.158 208.288 222.589 208.148 223.078 208.148C223.199 208.148 223.33 208.155 223.47 208.17C223.61 208.186 223.733 208.206 223.839 208.233V210.381C223.726 210.347 223.569 210.316 223.368 210.29C223.167 210.263 222.983 210.25 222.817 210.25C222.461 210.25 222.143 210.328 221.862 210.483C221.586 210.634 221.366 210.847 221.203 211.119C221.044 211.392 220.964 211.706 220.964 212.062V217H218.544Z"
              fill="white"
            />
            <path
              d="M227.33 217.165C226.773 217.165 226.277 217.068 225.841 216.875C225.405 216.678 225.061 216.388 224.807 216.006C224.557 215.619 224.432 215.138 224.432 214.562C224.432 214.078 224.521 213.67 224.699 213.341C224.877 213.011 225.119 212.746 225.426 212.545C225.733 212.345 226.081 212.193 226.472 212.091C226.866 211.989 227.278 211.917 227.71 211.875C228.218 211.822 228.627 211.773 228.937 211.727C229.248 211.678 229.473 211.606 229.614 211.511C229.754 211.417 229.824 211.277 229.824 211.091V211.057C229.824 210.697 229.71 210.419 229.483 210.222C229.259 210.025 228.941 209.926 228.528 209.926C228.093 209.926 227.746 210.023 227.489 210.216C227.231 210.405 227.061 210.644 226.977 210.932L224.739 210.75C224.852 210.22 225.076 209.761 225.409 209.375C225.742 208.985 226.172 208.686 226.699 208.477C227.229 208.265 227.843 208.159 228.54 208.159C229.025 208.159 229.489 208.216 229.932 208.33C230.379 208.443 230.775 208.619 231.119 208.858C231.468 209.097 231.742 209.403 231.943 209.778C232.144 210.15 232.244 210.595 232.244 211.114V217H229.949V215.79H229.881C229.741 216.062 229.553 216.303 229.318 216.511C229.083 216.716 228.801 216.877 228.472 216.994C228.142 217.108 227.761 217.165 227.33 217.165ZM228.023 215.494C228.379 215.494 228.693 215.424 228.966 215.284C229.239 215.14 229.453 214.947 229.608 214.705C229.763 214.462 229.841 214.187 229.841 213.881V212.955C229.765 213.004 229.661 213.049 229.528 213.091C229.4 213.129 229.254 213.165 229.091 213.199C228.928 213.229 228.765 213.258 228.602 213.284C228.439 213.307 228.292 213.328 228.159 213.347C227.875 213.388 227.627 213.455 227.415 213.545C227.203 213.636 227.038 213.759 226.92 213.915C226.803 214.066 226.744 214.256 226.744 214.483C226.744 214.812 226.864 215.064 227.102 215.239C227.345 215.409 227.652 215.494 228.023 215.494Z"
              fill="white"
            />
            <path
              d="M241.384 210.761L239.168 210.898C239.13 210.708 239.048 210.538 238.923 210.386C238.798 210.231 238.634 210.108 238.429 210.017C238.228 209.922 237.988 209.875 237.707 209.875C237.332 209.875 237.016 209.955 236.759 210.114C236.501 210.269 236.372 210.477 236.372 210.739C236.372 210.947 236.455 211.123 236.622 211.267C236.789 211.411 237.075 211.527 237.48 211.614L239.06 211.932C239.908 212.106 240.541 212.386 240.957 212.773C241.374 213.159 241.582 213.667 241.582 214.295C241.582 214.867 241.414 215.369 241.077 215.801C240.743 216.233 240.285 216.57 239.702 216.812C239.122 217.051 238.454 217.17 237.696 217.17C236.541 217.17 235.62 216.93 234.935 216.449C234.253 215.964 233.853 215.305 233.736 214.472L236.116 214.347C236.188 214.699 236.363 214.968 236.639 215.153C236.916 215.335 237.27 215.426 237.702 215.426C238.126 215.426 238.467 215.345 238.724 215.182C238.986 215.015 239.118 214.801 239.122 214.54C239.118 214.32 239.026 214.14 238.844 214C238.662 213.856 238.382 213.746 238.003 213.67L236.491 213.369C235.639 213.199 235.005 212.903 234.588 212.483C234.175 212.062 233.969 211.527 233.969 210.875C233.969 210.314 234.12 209.831 234.423 209.426C234.73 209.021 235.16 208.708 235.713 208.489C236.27 208.269 236.921 208.159 237.668 208.159C238.77 208.159 239.637 208.392 240.27 208.858C240.906 209.324 241.277 209.958 241.384 210.761ZM237.168 216.955H238.281L238.19 217.449C238.58 217.509 238.899 217.655 239.145 217.886C239.395 218.117 239.522 218.432 239.526 218.83C239.529 219.394 239.268 219.843 238.741 220.176C238.215 220.513 237.476 220.682 236.526 220.682L236.503 219.602C236.98 219.602 237.353 219.544 237.622 219.426C237.895 219.312 238.037 219.134 238.048 218.892C238.056 218.661 237.967 218.485 237.781 218.364C237.596 218.242 237.306 218.157 236.912 218.108L237.168 216.955Z"
              fill="white"
            />
            <path
              d="M242.943 442.08C242.849 441.773 242.718 441.498 242.551 441.256C242.388 441.009 242.191 440.799 241.96 440.625C241.733 440.451 241.472 440.32 241.176 440.233C240.881 440.142 240.559 440.097 240.21 440.097C239.585 440.097 239.028 440.254 238.54 440.568C238.051 440.883 237.667 441.345 237.386 441.955C237.11 442.561 236.972 443.299 236.972 444.17C236.972 445.049 237.11 445.794 237.386 446.403C237.663 447.013 238.047 447.477 238.54 447.795C239.032 448.11 239.604 448.267 240.256 448.267C240.847 448.267 241.358 448.153 241.79 447.926C242.225 447.699 242.561 447.377 242.795 446.96C243.03 446.54 243.148 446.047 243.148 445.483L243.625 445.557H240.466V443.909H245.188V445.307C245.188 446.303 244.975 447.165 244.551 447.892C244.127 448.619 243.544 449.18 242.801 449.574C242.059 449.964 241.206 450.159 240.244 450.159C239.172 450.159 238.231 449.919 237.42 449.438C236.614 448.953 235.983 448.265 235.528 447.375C235.078 446.481 234.852 445.42 234.852 444.193C234.852 443.254 234.985 442.415 235.25 441.676C235.519 440.938 235.894 440.311 236.375 439.795C236.856 439.277 237.42 438.883 238.068 438.614C238.716 438.341 239.42 438.205 240.182 438.205C240.826 438.205 241.426 438.299 241.983 438.489C242.54 438.674 243.034 438.939 243.466 439.284C243.902 439.629 244.259 440.038 244.54 440.511C244.82 440.985 245.004 441.508 245.091 442.08H242.943Z"
              fill="white"
            />
            <path
              d="M249.646 450.176C249.093 450.176 248.595 450.078 248.152 449.881C247.713 449.68 247.364 449.384 247.107 448.994C246.853 448.604 246.726 448.123 246.726 447.551C246.726 447.059 246.817 446.652 246.999 446.33C247.18 446.008 247.429 445.75 247.743 445.557C248.057 445.364 248.411 445.218 248.805 445.119C249.203 445.017 249.614 444.943 250.038 444.898C250.55 444.845 250.965 444.797 251.283 444.756C251.601 444.71 251.832 444.642 251.976 444.551C252.124 444.456 252.197 444.311 252.197 444.114V444.08C252.197 443.652 252.071 443.32 251.817 443.085C251.563 442.85 251.197 442.733 250.72 442.733C250.216 442.733 249.817 442.843 249.521 443.063C249.23 443.282 249.033 443.542 248.93 443.841L247.01 443.568C247.161 443.038 247.411 442.595 247.76 442.239C248.108 441.879 248.535 441.61 249.038 441.432C249.542 441.25 250.099 441.159 250.709 441.159C251.129 441.159 251.548 441.208 251.965 441.307C252.381 441.405 252.762 441.568 253.107 441.795C253.451 442.019 253.728 442.324 253.936 442.71C254.148 443.097 254.254 443.58 254.254 444.159V450H252.277V448.801H252.209C252.084 449.044 251.908 449.271 251.68 449.483C251.457 449.691 251.175 449.86 250.834 449.989C250.497 450.114 250.101 450.176 249.646 450.176ZM250.18 448.665C250.593 448.665 250.951 448.583 251.254 448.42C251.557 448.254 251.79 448.034 251.953 447.761C252.12 447.489 252.203 447.191 252.203 446.869V445.841C252.139 445.894 252.029 445.943 251.874 445.989C251.722 446.034 251.552 446.074 251.362 446.108C251.173 446.142 250.985 446.172 250.8 446.199C250.614 446.225 250.453 446.248 250.317 446.267C250.01 446.309 249.735 446.377 249.493 446.472C249.25 446.566 249.059 446.699 248.919 446.869C248.779 447.036 248.709 447.252 248.709 447.517C248.709 447.896 248.847 448.182 249.124 448.375C249.4 448.568 249.752 448.665 250.18 448.665Z"
              fill="white"
            />
            <path
              d="M256.209 450V448.693L260.709 443.051V442.977H256.357V441.273H263.226V442.676L258.942 448.222V448.295H263.374V450H256.209Z"
              fill="white"
            />
            <path
              d="M265.307 450V441.273H267.364V450H265.307ZM266.341 440.034C266.015 440.034 265.735 439.926 265.5 439.71C265.265 439.491 265.148 439.227 265.148 438.92C265.148 438.61 265.265 438.347 265.5 438.131C265.735 437.911 266.015 437.801 266.341 437.801C266.67 437.801 266.951 437.911 267.182 438.131C267.417 438.347 267.534 438.61 267.534 438.92C267.534 439.227 267.417 439.491 267.182 439.71C266.951 439.926 266.67 440.034 266.341 440.034Z"
              fill="white"
            />
            <path
              d="M271.99 450.176C271.437 450.176 270.939 450.078 270.496 449.881C270.056 449.68 269.708 449.384 269.45 448.994C269.197 448.604 269.07 448.123 269.07 447.551C269.07 447.059 269.161 446.652 269.342 446.33C269.524 446.008 269.772 445.75 270.087 445.557C270.401 445.364 270.755 445.218 271.149 445.119C271.547 445.017 271.958 444.943 272.382 444.898C272.893 444.845 273.308 444.797 273.626 444.756C273.945 444.71 274.176 444.642 274.32 444.551C274.467 444.456 274.541 444.311 274.541 444.114V444.08C274.541 443.652 274.414 443.32 274.161 443.085C273.907 442.85 273.541 442.733 273.064 442.733C272.56 442.733 272.161 442.843 271.865 443.063C271.573 443.282 271.376 443.542 271.274 443.841L269.354 443.568C269.505 443.038 269.755 442.595 270.104 442.239C270.452 441.879 270.878 441.61 271.382 441.432C271.886 441.25 272.443 441.159 273.053 441.159C273.473 441.159 273.892 441.208 274.308 441.307C274.725 441.405 275.106 441.568 275.45 441.795C275.795 442.019 276.072 442.324 276.28 442.71C276.492 443.097 276.598 443.58 276.598 444.159V450H274.621V448.801H274.553C274.428 449.044 274.251 449.271 274.024 449.483C273.801 449.691 273.518 449.86 273.178 449.989C272.84 450.114 272.445 450.176 271.99 450.176ZM272.524 448.665C272.937 448.665 273.295 448.583 273.598 448.42C273.901 448.254 274.134 448.034 274.297 447.761C274.464 447.489 274.547 447.191 274.547 446.869V445.841C274.483 445.894 274.373 445.943 274.217 445.989C274.066 446.034 273.895 446.074 273.706 446.108C273.517 446.142 273.329 446.172 273.143 446.199C272.958 446.225 272.797 446.248 272.661 446.267C272.354 446.309 272.079 446.377 271.837 446.472C271.594 446.566 271.403 446.699 271.263 446.869C271.123 447.036 271.053 447.252 271.053 447.517C271.053 447.896 271.191 448.182 271.467 448.375C271.744 448.568 272.096 448.665 272.524 448.665Z"
              fill="white"
            />
            <path
              d="M280.723 444.886V450H278.666V441.273H280.632V442.756H280.734C280.935 442.267 281.255 441.879 281.695 441.591C282.138 441.303 282.685 441.159 283.337 441.159C283.939 441.159 284.464 441.288 284.911 441.545C285.361 441.803 285.71 442.176 285.956 442.665C286.206 443.153 286.329 443.746 286.325 444.443V450H284.268V444.761C284.268 444.178 284.117 443.722 283.814 443.392C283.515 443.063 283.1 442.898 282.57 442.898C282.21 442.898 281.89 442.977 281.609 443.136C281.333 443.292 281.115 443.517 280.956 443.813C280.801 444.108 280.723 444.466 280.723 444.886Z"
              fill="white"
            />
            <path
              d="M292.774 441.273V442.864H287.757V441.273H292.774ZM288.996 439.182H291.053V447.375C291.053 447.652 291.094 447.864 291.178 448.011C291.265 448.155 291.378 448.254 291.518 448.307C291.659 448.36 291.814 448.386 291.984 448.386C292.113 448.386 292.231 448.377 292.337 448.358C292.447 448.339 292.53 448.322 292.587 448.307L292.933 449.915C292.823 449.953 292.666 449.994 292.462 450.04C292.261 450.085 292.015 450.112 291.723 450.119C291.208 450.134 290.744 450.057 290.331 449.886C289.918 449.712 289.59 449.443 289.348 449.08C289.109 448.716 288.992 448.261 288.996 447.716V439.182Z"
              fill="white"
            />
            <path
              d="M298.264 450.17C297.389 450.17 296.634 449.989 295.997 449.625C295.365 449.258 294.878 448.739 294.537 448.068C294.196 447.394 294.026 446.6 294.026 445.688C294.026 444.79 294.196 444.002 294.537 443.324C294.882 442.642 295.363 442.112 295.98 441.733C296.598 441.35 297.323 441.159 298.156 441.159C298.694 441.159 299.202 441.246 299.679 441.42C300.16 441.591 300.584 441.856 300.952 442.216C301.323 442.576 301.615 443.034 301.827 443.591C302.039 444.144 302.145 444.803 302.145 445.568V446.199H294.992V444.813H300.173C300.17 444.419 300.084 444.068 299.918 443.761C299.751 443.451 299.518 443.206 299.219 443.028C298.923 442.85 298.579 442.761 298.185 442.761C297.764 442.761 297.395 442.864 297.077 443.068C296.759 443.269 296.51 443.534 296.332 443.864C296.158 444.189 296.069 444.547 296.065 444.938V446.148C296.065 446.655 296.158 447.091 296.344 447.455C296.529 447.814 296.789 448.091 297.122 448.284C297.456 448.473 297.846 448.568 298.293 448.568C298.592 448.568 298.863 448.527 299.105 448.443C299.348 448.356 299.558 448.229 299.736 448.063C299.914 447.896 300.048 447.689 300.139 447.443L302.06 447.659C301.938 448.167 301.707 448.61 301.367 448.989C301.029 449.364 300.598 449.655 300.071 449.864C299.545 450.068 298.942 450.17 298.264 450.17Z"
              fill="white"
            />
            <path
              d="M303.885 453.273V441.273H305.908V442.716H306.027C306.133 442.504 306.283 442.278 306.476 442.04C306.669 441.797 306.93 441.591 307.26 441.42C307.59 441.246 308.01 441.159 308.521 441.159C309.196 441.159 309.804 441.331 310.345 441.676C310.891 442.017 311.322 442.523 311.641 443.193C311.963 443.86 312.124 444.678 312.124 445.648C312.124 446.606 311.966 447.42 311.652 448.091C311.338 448.761 310.91 449.273 310.368 449.625C309.826 449.977 309.213 450.153 308.527 450.153C308.027 450.153 307.612 450.07 307.283 449.903C306.953 449.737 306.688 449.536 306.487 449.301C306.29 449.063 306.137 448.837 306.027 448.625H305.942V453.273H303.885ZM305.902 445.636C305.902 446.201 305.982 446.695 306.141 447.119C306.304 447.544 306.536 447.875 306.84 448.114C307.146 448.348 307.518 448.466 307.953 448.466C308.408 448.466 308.788 448.345 309.095 448.102C309.402 447.856 309.633 447.521 309.788 447.097C309.947 446.669 310.027 446.182 310.027 445.636C310.027 445.095 309.949 444.614 309.794 444.193C309.639 443.773 309.408 443.443 309.101 443.205C308.794 442.966 308.411 442.847 307.953 442.847C307.514 442.847 307.141 442.962 306.834 443.193C306.527 443.424 306.294 443.748 306.135 444.165C305.98 444.581 305.902 445.072 305.902 445.636Z"
              fill="white"
            />
          </g>
        </svg>
      </div>

      <div className="flex flex-col justify-center items-center mt-8 bg-gray-200 p-4 rounded-lg shadow-sm w-fit mx-auto hover:bg-gray-300">
        <ModalImage
          small={'/cities-small.svg'}
          large={'/cities.svg'}
          hideDownload={true}
          alt="All 11 cities affected by earthquake"
          imageBackgroundColor={'transparent'}
        />
        <span className="mt-3 text-sm text-gray-600 italic">
          Click image to see all 11 cities affected by earthquake
        </span>
      </div>
    </>
  );
};

export default Infographic;
