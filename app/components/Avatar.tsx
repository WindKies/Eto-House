'use client'

import Image from "next/image";

interface AvatarProps {
    src: string | null | undefined;
    style?: React.CSSProperties;
};

const Avatar: React.FC<AvatarProps> = ({
    src,
    style
}) => {
    return (
        <Image
            className="rounded-full"
            height="30"
            width="30"
            alt="Avatar"
            src={src || "/images/avt0.png"}
            style={style}
        
        />
    );
}

export default Avatar;