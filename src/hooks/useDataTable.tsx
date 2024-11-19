import { ColumnsType } from 'antd/es/table';
import { useEffect, useRef, useState } from 'react';

const HEADER_HEIGHT = 55;
const PAGINATION_HEIGHT = 64;

type HookReturns = {
    tableRef: React.RefObject<any>;
    tableWidth: number;
    tableHeight: number;
}

const DEFAULT_WIDTH = 200;

const convertToPx = (value?: number | string): number =>
{
    if (!value)
    {
        return DEFAULT_WIDTH;
    }
    if (typeof value === 'number')
    {
        return value;
    }
    if (value.endsWith('px'))
    {
        return parseInt(value);
    }

    return DEFAULT_WIDTH;
};

export function useDataTable<T>(columns: ColumnsType<T>): HookReturns
{
    const tableRef = useRef<any>(null);

    const [tableWidth, setTableWidth] = useState(window.innerWidth);
    const [tableHeight, setTableHeight] = useState(window.innerHeight);

    useEffect(() =>
    {
        const handleResize = () =>
        {
            const containerHeight = tableRef.current?.offsetHeight;
            const tableHeight = containerHeight - HEADER_HEIGHT - PAGINATION_HEIGHT;
            tableRef.current.firstChild.style.height = tableHeight + 'px';
            setTableHeight(tableHeight);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () =>
        {
            // tableRef.current.onresize = null;
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() =>
    {
        if (!tableRef.current.firstChild) {return;}
        const resizeObserver = new ResizeObserver(() =>
        {
            const containerHeight = tableRef.current?.offsetHeight;
            const tableHeight = containerHeight - HEADER_HEIGHT - PAGINATION_HEIGHT;
            tableRef.current.firstChild.style.height = tableHeight + 'px';
            setTableHeight(tableHeight);
        });
        resizeObserver.observe(tableRef.current.firstChild);
        return () => resizeObserver.disconnect(); // clean up
    }, []);

    useEffect(() =>
    {
        setTableWidth(columns.reduce((acc, column) =>
        {
            return acc + convertToPx(column.width);
        }, 0));
    }, [columns]);

    return {
        tableRef,
        tableHeight, tableWidth,
    };
}
