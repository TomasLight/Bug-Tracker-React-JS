import React, { CSSProperties, FunctionComponent } from "react";
import { StylesConfig } from "react-select";

import { DefaultClearIndicator } from "@shared/molecules/SelectComponents/DefaultClearIndicator";
import { DefaultControl } from "@shared/molecules/SelectComponents/DefaultControl";
import { DefaultDropdownIndicator } from "@shared/molecules/SelectComponents/DefaultDropdownIndicator";
import { DefaultMenuList } from "@shared/molecules/SelectComponents/DefaultMenuList";
import { DefaultPlaceholder } from "@shared/molecules/SelectComponents/DefaultPlaceholder";
import { DefaultSingleOption } from "@shared/molecules/SelectComponents/DefaultSingleOption";
import { DefaultSingleValue } from "@shared/molecules/SelectComponents/DefaultSingleValue";
import { DefaultValueContainer } from "@shared/molecules/SelectComponents/DefaultValueContainer";

import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";
import { FieldBaseProps } from "@shared/organisms/Fields/FieldBase/FieldBase";
import { Select, ISelectProps } from "./Select";

interface ISingleSelectProps extends ISelectProps<IFieldOption>, FieldBaseProps {
    controlStyles?: CSSProperties;
}

type Props = ISingleSelectProps;

const SingleSelect: FunctionComponent<Props> = (props: Props) => {
    const { components, controlStyles, styles, ...rest } = props;

    const overriddenSelectComponentStyles: StylesConfig = {
        control: () => (controlStyles),
        singleValue: () => ({}),
        ...styles,
    };

    return (
        <Select
            {...rest}
            styles={overriddenSelectComponentStyles}
            components={{
                ClearIndicator: DefaultClearIndicator,
                DropdownIndicator: DefaultDropdownIndicator,
                LoadingIndicator: null,
                IndicatorSeparator: null,
                Control: DefaultControl,
                MenuList: DefaultMenuList,
                Option: DefaultSingleOption,
                Placeholder: DefaultPlaceholder,
                SingleValue: DefaultSingleValue,
                ValueContainer: DefaultValueContainer,
                ...components,
            }}
        />
    );
};

export { SingleSelect, ISingleSelectProps, Props as SingleSelectProps };
