import { FAIcon } from '@repo/vicon';
import { Button, Flex, Input, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { ButtonType } from './type';
import { TableRowSelection } from 'antd/es/table/interface';

type DataTableProps<T> = {
    dataSource: T[]
    rowSelection?: TableRowSelection<T>
    buttons?: ButtonType[]
    onfilter?: (keyword: string) => void
} & { [key: string]: any };

export function DataTable<T>(props: DataTableProps<T>): JSX.Element
{

    const { dataSource, buttons, rowSelection, ...tableProps } = props;
    const { onfilter } = props;

    const [searchWord, setSearchWord] = useState<string>('');


    useEffect(() =>
    {
        onfilter && onfilter(searchWord);
    }, [searchWord]);

    return (
        <Flex
            vertical
        >
            <Flex
                justify='space-between'
                align='center'
            >
                <Flex>
                    {
                        buttons && buttons.map((buttons, key) =>
                        {
                            const { icon, label, onclick, ...buttonProps } = buttons;
                            return (
                                <Button
                                    key={key}
                                    style={{ display: 'flex', width: 'fit-content', margin: '12px 12px 12px 0' }}
                                    {...buttonProps}
                                    onClick={onclick}
                                >
                                    <FAIcon
                                        icon={icon}
                                        size='14px'
                                    />
                                    <div>{label}</div>
                                </Button>

                            );
                        })
                    }
                </Flex>
                {
                    onfilter && (
                        <Input
                            placeholder='Search for word'
                            style={{
                                maxWidth: 300,
                                marginRight: '4px',
                            }}
                            onChange={e => setSearchWord(e.target.value)}
                        />
                    )}

            </Flex>
            <Table<T>
                dataSource={dataSource}
                rowSelection={{ type: 'checkbox', ...rowSelection }}
                {...tableProps}
            />
        </Flex>
    );
}
