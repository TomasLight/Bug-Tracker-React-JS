import { Typography } from "mui-typography";
import React, { FunctionComponent } from "react";
import { ValueContainerProps } from "react-select/src/components/containers";

import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";
import { SelectProps } from "@shared/organisms/Fields/Select/Select";

interface IDefaultMultiValueLabelProps {
    data: IFieldOption;
    selectProps: SelectProps;
}

type Props = IDefaultMultiValueLabelProps & ValueContainerProps<IFieldOption>;

const DefaultMultiValueLabel: FunctionComponent<Props> = (props: Props) => {
    const {
        selectProps: {
            value,
            isDisabled,
            isFocused,
        },
        data,
    } = props;
    let { children } = props;

    const selectedOptions: IFieldOption[] = value;

    const optionIndex = selectedOptions.indexOf(data as IFieldOption);
    if (0 <= optionIndex && optionIndex < selectedOptions.length - 1) {
        children += ",";
    }

    return (
        <Typography
            size={300}
            color={isDisabled
                ? "disabled"
                : isFocused
                    ? "primary"
                    : "medium"
            }
        >
            {children}
        </Typography>
    );
};

export { DefaultMultiValueLabel };
