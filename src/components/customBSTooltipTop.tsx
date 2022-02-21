import React, { JSXElementConstructor, ReactElement, ReactNode } from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { OverlayTriggerRenderProps } from "react-bootstrap/esm/OverlayTrigger"

interface Props {
    children: ReactElement<any, string | JSXElementConstructor<any>> | ((props: OverlayTriggerRenderProps) => ReactNode)
    tooltipText: string;
    uniqueIdAndDescriptionText: string;
}

const CustomBSTooltipTop = (props:Props) => {

    return (
        <OverlayTrigger
        key={`tooltip-${props.uniqueIdAndDescriptionText}`}
        placement={'top'}
        overlay={
            <Tooltip id={`tooltip-${props.uniqueIdAndDescriptionText}`}>
                { props.tooltipText }
            </Tooltip>
        }
    >
        { props.children }
    </OverlayTrigger>
    )
}

export default CustomBSTooltipTop;