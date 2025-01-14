import { Flex, Layout, theme } from 'antd';
import './MacTitleBar.css';

type MacTitleBarProps = {
    disableMaximize?: boolean,
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
}

export const MacTitleBar: React.FC<MacTitleBarProps> = (props) =>
{
    const { onClose, onMaximize, onMinimize } = props;

    const { token } = theme.useToken();

    const handleMaximize = () =>
    {
        onMaximize();
    };

    return (
        <Layout style={{ backgroundColor: token?.colorBgContainer }}>
            <Flex
                className="mac-buttons"
                data-tauri-drag-region
                onDoubleClick={handleMaximize}
            >
                <div
                    className="btn close-btn"
                    onClick={onClose}
                />
                <div
                    className="btn min-btn"
                    onClick={onMinimize}
                />
                <div
                    className="btn max-btn"
                    onClick={handleMaximize}
                />
            </Flex>
        </Layout>
    );
};
