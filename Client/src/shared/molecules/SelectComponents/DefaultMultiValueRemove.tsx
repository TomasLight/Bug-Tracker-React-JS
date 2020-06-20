import React, { FunctionComponent } from "react";
import { MultiValueRemoveProps } from "react-select/src/components/MultiValue";

import { SelectFieldOption } from "@shared/organisms/Fields/Select/FieldOptions/SelectFieldOption";

type Props = MultiValueRemoveProps<SelectFieldOption>;

const DefaultMultiValueRemove: FunctionComponent<Props> = (props: Props) => {
    return (
        <></>
    );
};

export { DefaultMultiValueRemove };
