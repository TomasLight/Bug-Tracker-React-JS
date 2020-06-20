import { IAppTheme } from "mui-app-theme";
import { Typography } from "mui-typography";
import React, { FunctionComponent, useEffect, useState } from "react";
import { MenuListComponentProps } from "react-select/src/components/Menu";
import { List } from "react-virtualized";

import { makeStyles } from "@material-ui/core";

import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";
import { Guid } from "@utils/Guid";
import { findNode } from "@shared/molecules/SelectComponents/utils/findNode";

const useStyles = makeStyles((theme: IAppTheme) => ({
    noOptions: {
        display: "flex",
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
    },
}));

type Props = MenuListComponentProps<IFieldOption>;

const defaultHeight = 300;
const rowHeight = 48;
const defaultNumberOfRowsForListHeightSize = 6;

const DefaultMenuList: FunctionComponent<Props> = (props: Props) => {
    const {
        selectProps: {
            numberOfRowsForListHeightSize = defaultNumberOfRowsForListHeightSize,
            noOptionsLabel,
        },
        children,
    } = props;

    const classes = useStyles();

    const [ listId ] = useState<string>(Guid.generate());
    const [ width, setWidth ] = useState<number>(1);
    const [ height, setHeight ] = useState<number>(defaultHeight);
    const [ rowCount, setRowCount ] = useState<number>(0);

    useEffect(() => {
        const node: HTMLElement = findNode(listId, 1);
        if (node && node.offsetWidth !== width) {
            setWidth(node.offsetWidth);
        }
    }, []);

    useEffect(() => {
        const count = Array.isArray(children) ? children.length : 0;
        setRowCount(count);

        let newHeight = height;
        if (numberOfRowsForListHeightSize) {
            newHeight = numberOfRowsForListHeightSize * rowHeight;
        }
        if (count === 0) {
            newHeight = rowHeight;
        }
        else if (count < numberOfRowsForListHeightSize) {
            newHeight = count * rowHeight;
        }
        setHeight(newHeight);
    }, [ children ]);

    const rowRenderer = ({ key, index, style }) => {
        return (
            <div key={key} style={style}>
                {props.children[index]}
            </div>
        );
    };

    const emptyRowRenderer = () => {
        return (
            <div className={classes.noOptions}>
                <Typography size={300} color={"medium"}>
                    {noOptionsLabel || "No options"}
                </Typography>
            </div>
        );
    };

    return (
        <List
            width={width}
            height={height}
            rowHeight={rowHeight}
            rowCount={rowCount}
            rowRenderer={rowRenderer}
            noRowsRenderer={emptyRowRenderer}
            id={listId}
        />
    );
};

export { DefaultMenuList };
