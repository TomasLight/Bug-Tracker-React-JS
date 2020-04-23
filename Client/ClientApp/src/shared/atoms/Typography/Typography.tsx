import React, { CSSProperties, ElementType, FunctionComponent, Ref } from "react";

import { TypographyClassNameBuilder } from "./TypographyClassNameBuilder";
import { TypographyColorVariant } from "./TypographyColorVariant";
import { TypographySizeVariant } from "./TypographySizeVariant";

interface ITypographyProps {
    size?: TypographySizeVariant;
    color?: TypographyColorVariant;
    bold?: boolean;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    noWrap?: boolean;

    id?: string;
    component?: ElementType;

    forwardedRef?: Ref<any>;
}

type Props = ITypographyProps;

const Typography: FunctionComponent<Props> = (props) => {
    const {
        children,
        size = "200",
        color = "medium",
        bold,
        disabled,
        className,
        noWrap,
        component,
        forwardedRef,
        ...rest
    } = props;

    const classNameBuilder = new TypographyClassNameBuilder(className);
    let typographyClassName: string = classNameBuilder
        .appendColor(disabled, color)
        .appendSize(size)
        .appendNoWrap(noWrap)
        .appendBold(bold)
        .build();

    const Component = component || "span";
    return (
        <Component
            className={typographyClassName}
            ref={forwardedRef}
            {...rest}
        >
            {children}
        </Component>
    );
};

export { Typography, ITypographyProps as TypographyProps };
