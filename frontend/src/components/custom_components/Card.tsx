import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Card.css';

const Card = () => {
    const cardRef = useRef(null);

    useEffect(() => {
        // GSAP animation to slide the card from the top continuously
        gsap.fromTo(
            cardRef.current,
            { y: '-100%' }, // start position (off-screen)
            {
                y: '100%', // move to the bottom
                duration: 2, // duration of one full cycle
                ease: 'power3.out', // easing for smooth motion
                repeat: -1, // repeat the animation indefinitely
                yoyo: true, // make it move back and forth (up and down)
                repeatDelay: 0, // no delay between repetitions
            }
        );
    }, []);

    return (
        <div
            ref={cardRef}
            className='border-2 border-[#D0A47B] relative rounded-md mt-3 w-full h-[50%] overflow-hidden gradient1 -translate-[95%]'
        >
            <div
                className={`border-2 border-white border-r-[D0A47B] p-3 rounded-md w-full absolute h-[40%] -bottom-0`}
            >
                {/* Card content */}
            </div>
        </div>
    );
};

export default Card;
