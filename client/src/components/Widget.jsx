import React from 'react'
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import "../styles/widget.scss"

const Widget = ({ title, total, link, icon, isMoney }) => {
    return (
        <div className='widget'>
            <div className="left">
                <span className="title">{title}</span>
                <span className="counter">
                    {isMoney && '$'}{total}
                </span>
                <a className="link">{link}</a>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    100%
                </div>
                {icon}
            </div>
        </div>
    )
}

export default Widget