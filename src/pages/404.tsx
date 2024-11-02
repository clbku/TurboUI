import { Flex, Result, Button } from 'antd';

export const NotFoundPage: React.FC = () =>
{
    return (
        <Flex
            justify='center'
            align='center'
            style={{ width: '100vw', height: '100vh' }}
        >
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        </Flex>
    );
};
