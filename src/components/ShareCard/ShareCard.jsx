import React from 'react';
import { themes } from '../../../themes';

const ShareCard = ({ share, theme }) => {
    const t = themes[theme] || themes.minimal;

    return (
        <div
            id="export-card"
            style={{
                backgroundImage: `url(${t.bgImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: t.textColor,
            }}
            className="w-75.5 h-95 md:w-87.5 md:h-115  overflow-hidden shadow-xl"
        >
            <div
                style={{ backgroundColor: t.overlay || "transparent" }}
                className="w-full h-full flex flex-col justify-center items-center text-center p-6"
            >
                <div className=' py-10 px-5 rounded-xl bg-white/5 backdrop-blur-lg shadow-xl my-5 mx-5'>
                    <h2 className="text-xl font-semibold mb-2 border-b-2 border-b-white">
                        Anonymous Message
                    </h2>
                    <p
                        className="text-lg"
                        style={{
                            wordBreak: "break-word", 
                            overflowWrap: "anywhere",
                            whiteSpace: "normal",
                            display: "block",
                            width: "100%"
                        }}
                    >
                        {share.messageText}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShareCard;