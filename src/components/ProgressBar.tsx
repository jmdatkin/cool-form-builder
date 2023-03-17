import { useEffect, useRef } from "react";

type Props = {
    numSteps: number,
    currentStep: number,
    bgColor?: string,
    fgColor?: string
};

function ProgressBar(props: Props) {

    const wrapperElRef = useRef<HTMLDivElement>(null);
    const bgElRef = useRef<HTMLDivElement>(null);
    const fgElRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bb = wrapperElRef.current?.getBoundingClientRect();

        const widthPercentage = props.currentStep / props.numSteps;

        bgElRef.current!.style.width = bb?.width+'px';
        fgElRef.current!.style.width = (bb!.width*widthPercentage)+'px';
    }, [props.numSteps, props.currentStep]);

    return ( 
        <div ref={wrapperElRef} className="w-full h-[20px] relative border">
            <div ref={bgElRef} className="h-full absolute transition-width" style={{backgroundColor: props.bgColor}}></div>
            <div ref={fgElRef} className="h-full absolute transition-width" style={{backgroundColor: props.fgColor, transition: 'width 0.6s ease'}}></div>
        </div>
     );
}

ProgressBar.defaultProps = {
    bgColor: '#000',
    fgColor: '#fff'
};

export default ProgressBar;