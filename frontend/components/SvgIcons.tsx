


type IconProps = {
    height?: string | number;
    width?: string | number;
    color?: string;
};


export const EyeSvgIcon: React.FC<IconProps> = ({ height, width, color }) => {
    return (    
        <svg width={ width ? width : "15" } height={ height ? height : "15" } viewBox="0 0 10 10" fill={ color } xmlns="http://www.w3.org/2000/svg">
            <path d="M9.625 3.57484C8.47 1.75984 6.78 0.714844 5 0.714844C4.11 0.714844 3.245 0.974844 2.455 1.45984C1.665 1.94984 0.955 2.66484 0.375 3.57484C-0.125 4.35984 -0.125 5.63484 0.375 6.41984C1.53 8.23984 3.22 9.27984 5 9.27984C5.89 9.27984 6.755 9.01984 7.545 8.53484C8.335 8.04484 9.045 7.32984 9.625 6.41984C10.125 5.63984 10.125 4.35984 9.625 3.57484ZM5 7.01984C3.88 7.01984 2.98 6.11484 2.98 4.99984C2.98 3.88484 3.88 2.97984 5 2.97984C6.12 2.97984 7.02 3.88484 7.02 4.99984C7.02 6.11484 6.12 7.01984 5 7.01984Z" fill={ color }/>
        </svg>
    );
};


export const ProductSvgIcon: React.FC<IconProps> = ({ height, width, color }) => {
    return (
        <svg width={ width ? width : "15" } height={ height ? height : "15" } viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M52.0266 15.6L36.1866 6.45331C33.6 4.95998 30.4 4.95998 27.7866 6.45331L11.9733 15.6C9.38662 17.0933 7.78662 19.8666 7.78662 22.88V41.12C7.78662 44.1066 9.38662 46.88 11.9733 48.4L27.8133 57.5466C30.4 59.04 33.6 59.04 36.2133 57.5466L52.0533 48.4C54.64 46.9066 56.24 44.1333 56.24 41.12V22.88C56.2133 19.8666 54.6133 17.12 52.0266 15.6ZM32 19.5733C35.44 19.5733 38.2133 22.3466 38.2133 25.7866C38.2133 29.2266 35.44 32 32 32C28.56 32 25.7866 29.2266 25.7866 25.7866C25.7866 22.3733 28.56 19.5733 32 19.5733ZM39.1466 44.4266H24.8533C22.6933 44.4266 21.44 42.0266 22.64 40.24C24.4533 37.5466 27.9733 35.7333 32 35.7333C36.0266 35.7333 39.5466 37.5466 41.36 40.24C42.56 42 41.28 44.4266 39.1466 44.4266Z" fill="#BABABA"/>
        </svg>
    );
};