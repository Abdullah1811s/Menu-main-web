
import '../../App.css';
import { useRef, useEffect } from "react";
import gsap from "gsap";
import "./mission.css"

export const MissionComponent = () => {
  const box1 = useRef<HTMLSpanElement>(null);
  const box2 = useRef<HTMLSpanElement>(null);
  const box3 = useRef<HTMLSpanElement>(null);
  const imageRef1 = useRef<HTMLImageElement>(null);
  const imageRef2 = useRef<HTMLImageElement>(null);
  const imageRef3 = useRef<HTMLImageElement>(null);

  useEffect(() => {

    const box1Element = box1.current;
    const image1Element = imageRef1.current;

    const enterBox1 = () => {
      gsap.killTweensOf(box1Element);
      gsap.killTweensOf(image1Element);

      gsap.set(image1Element, { opacity: 0, filter: 'blur(5px)', display: 'block' });

      gsap.to(box1Element, {
        scale: 3,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      });

      gsap.to(image1Element, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      });
    };

    const leaveBox1 = () => {
      gsap.killTweensOf(box1Element);
      gsap.killTweensOf(image1Element);

      gsap.to(box1Element, {
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.3,
        ease: 'power2.in'
      });

      gsap.to(image1Element, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(image1Element, { display: 'none' });
        }
      });
    };


    const box2Element = box2.current;
    const image2Element = imageRef2.current;

    const enterBox2 = () => {
      gsap.killTweensOf(box2Element);
      gsap.killTweensOf(image2Element);

      gsap.set(image2Element, { opacity: 0, filter: 'blur(5px)', display: 'block' });

      gsap.to(box2Element, {
        scale: 3,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      });

      gsap.to(image2Element, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      });
    };

    const leaveBox2 = () => {
      gsap.killTweensOf(box2Element);
      gsap.killTweensOf(image2Element);

      gsap.to(box2Element, {
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.3,
        ease: 'power2.in'
      });

      gsap.to(image2Element, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(image2Element, { display: 'none' });
        }
      });
    };


    const box3Element = box3.current;
    const image3Element = imageRef3.current;

    const enterBox3 = () => {
      gsap.killTweensOf(box3Element);
      gsap.killTweensOf(image3Element);

      gsap.set(image3Element, { opacity: 0, filter: 'blur(5px)', display: 'block' });

      gsap.to(box3Element, {
        scale: 3,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      });

      gsap.to(image3Element, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      });
    };

    const leaveBox3 = () => {
      gsap.killTweensOf(box3Element);
      gsap.killTweensOf(image3Element);

      gsap.to(box3Element, {
        scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.in'
      });

      gsap.to(image3Element, {
        opacity: 0,
        duration: 1,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(image3Element, { display: 'none' });
        }
      });
    };


    if (box1Element) {
      box1Element.addEventListener('mouseenter', enterBox1);
      box1Element.addEventListener('mouseleave', leaveBox1);
    }

    if (box2Element) {
      box2Element.addEventListener('mouseenter', enterBox2);
      box2Element.addEventListener('mouseleave', leaveBox2);
    }

    if (box3Element) {
      box3Element.addEventListener('mouseenter', enterBox3);
      box3Element.addEventListener('mouseleave', leaveBox3);
    }


    return () => {
      if (box1Element) {
        box1Element.removeEventListener('mouseenter', enterBox1);
        box1Element.removeEventListener('mouseleave', leaveBox1);
      }

      if (box2Element) {
        box2Element.removeEventListener('mouseenter', enterBox2);
        box2Element.removeEventListener('mouseleave', leaveBox2);
      }

      if (box3Element) {
        box3Element.removeEventListener('mouseenter', enterBox3);
        box3Element.removeEventListener('mouseleave', leaveBox3);
      }
    };
  }, []);

  return (
    <section className="flex flex-col mt-10 mb-5 w-full h-fit px-4 sm:px-6 md:px-8 box-border bg-black">
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-white">Our Mission</h2>

      <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-6 sm:mt-8 md:mt-10 text-center text-white leading-tight sm:leading-normal">
        <span className="outlined-text">The Menu</span> isn't just about deals
        <span
          ref={box1}
          className="relative bg-[#d1a77d] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-md inline-block mx-1 sm:mx-2 md:mx-3 align-middle overflow-hidden cursor-pointer"
        >
          <img
            ref={imageRef1}
            src="/images/spanImag.avif"
            alt=""
            className="absolute hidden inset-0 w-full h-full object-cover select-none pointer-events-none"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
        </span>
        it's <br className="sm:hidden" />
        about making <span className="outlined-text">every rand</span> go further.
        By<br className="sm:hidden" />
        joining,
        <span
          ref={box2}
          className="relative bg-[#d1a77d] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-md inline-block align-middle mx-1 sm:mx-2 md:mx-3 overflow-hidden cursor-pointer"
        >
          <img
            ref={imageRef2}
            src="/images/spanImag.avif"
            alt=""
            className="absolute hidden inset-0 w-full h-full object-cover select-none pointer-events-none"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
        </span>
        you're boosting <span className="outlined-text">local <br className="sm:hidden" /> businesses </span>
        and shaping
        <span
          ref={box3}
          className="relative bg-[#d1a77d] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 mx-1 sm:mx-2 md:mx-3 rounded-md inline-block align-middle overflow-hidden cursor-pointer"
        >
          <img
            ref={imageRef3}
            src="/images/spanImag.avif"
            alt=""
            className="absolute hidden inset-0 w-full h-full object-cover select-none pointer-events-none"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
        </span>
        a <span className="outlined-text">fairer<br className="sm:hidden" /> economy</span>
      </p>
    </section>
  );
};