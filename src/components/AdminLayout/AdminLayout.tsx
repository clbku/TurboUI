import { Button, Layout, theme } from 'antd';

import { FAIcon } from '@repo/vicon';
import { useState } from 'react';
import { SideBar } from '../SideBar/SideBar';

const { Content } = Layout;

type AdminLayoutProps = {}


export const AdminLayout: React.FC<AdminLayoutProps> = () =>
{
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            <Layout hasSider>
                <SideBar />
                <Layout>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
Esse enim cillum aute proident. Sit magna eiusmod in eu cillum mollit irure labore pariatur aliqua sit dolor dolor proident pariatur. Occaecat labore nostrud enim eiusmod magna do deserunt nulla eu tempor Lorem Lorem ullamco cupidatat anim. Cillum est commodo irure non dolor mollit ex minim. Et irure elit ex consectetur aute voluptate consequat nostrud aliquip. Eu eu culpa consequat aliquip id velit nisi irure laboris non. Excepteur irure enim pariatur exercitation irure quis ea aliqua veniam ullamco.

Et labore esse do quis minim aliquip excepteur elit ullamco officia. Nulla culpa laboris aliquip proident ad elit eu ex adipisicing. Officia tempor est cillum laboris nisi ullamco eiusmod. Labore culpa labore ad qui nulla consectetur nisi cupidatat proident consequat cupidatat sint anim enim est. Commodo veniam laborum nulla deserunt aliquip culpa.

Qui magna do irure ex deserunt voluptate enim reprehenderit. Eu aute non laboris nostrud ullamco ea excepteur amet ad Lorem exercitation do ex nisi amet. Ad quis incididunt ex ad nisi do ullamco mollit amet ullamco amet voluptate. Do adipisicing esse ad est dolore velit ea incididunt nostrud id consequat labore aliqua aliquip. Ad ut nostrud officia occaecat nulla. Veniam commodo sunt deserunt labore mollit anim duis incididunt cillum. Cupidatat sit excepteur veniam velit ea sint.

Ullamco enim Lorem culpa excepteur ipsum quis incididunt nostrud pariatur in aliquip tempor cupidatat. Proident consectetur dolor fugiat labore. Aute Lorem magna voluptate deserunt non incididunt est adipisicing cillum tempor laboris amet aliquip duis irure. Cillum tempor culpa laboris deserunt laborum laboris reprehenderit aute commodo officia ullamco ullamco aliqua in anim.

Aliquip consequat adipisicing esse tempor et. Irure et velit consectetur nostrud mollit officia fugiat cupidatat exercitation velit incididunt irure adipisicing magna et. Mollit Lorem mollit voluptate culpa nulla mollit ea quis mollit cillum quis pariatur. Labore ea ad dolore ad officia anim ad Lorem dolor tempor adipisicing ex labore aliquip. Do aliqua tempor in pariatur ad proident sint incididunt ad officia ullamco ipsum. Laboris ea incididunt irure reprehenderit irure Lorem sunt fugiat. Ex ad aliqua ea mollit ullamco ullamco sunt aute est ad tempor reprehenderit mollit. Officia cupidatat est officia dolor ea nulla ea.

Nisi est commodo cillum amet laboris deserunt eiusmod velit mollit cillum eiusmod in. Sit non fugiat nostrud pariatur proident duis consectetur aute reprehenderit duis aliqua aliqua incididunt. Sint ut tempor eu occaecat occaecat exercitation nulla duis amet et culpa velit. Consectetur et consequat elit excepteur cillum commodo do est Lorem. Labore quis adipisicing irure velit labore consequat adipisicing occaecat Lorem amet laborum excepteur. Ut reprehenderit ullamco eu aute do sunt labore consectetur esse id.

Proident consequat aute duis voluptate qui proident elit sit ad non sint amet dolor. Ut adipisicing nisi deserunt adipisicing magna nisi pariatur do. Occaecat labore veniam proident eu quis minim commodo elit reprehenderit non culpa sit incididunt. Esse non consectetur labore fugiat incididunt non proident deserunt quis non duis veniam duis minim labore.

Deserunt voluptate est occaecat fugiat veniam nostrud incididunt. Culpa duis enim qui cillum ex deserunt laborum magna amet eiusmod non ad. Incididunt non sunt laboris aliquip labore exercitation irure laborum minim deserunt culpa id. Veniam reprehenderit eu pariatur incididunt laboris fugiat consequat do sunt cillum non culpa et incididunt dolor. Nulla fugiat duis commodo ex duis dolore aliquip ea commodo consequat minim. Culpa dolor sit sint minim veniam veniam commodo. Sit ea excepteur occaecat incididunt enim culpa dolor tempor ex cupidatat.

Dolore officia sint mollit consequat sit laborum ad aute nostrud id officia fugiat. Irure velit do eu officia labore et. Do cillum aute enim. Amet officia esse consectetur id culpa mollit duis excepteur est et sit. Est proident quis commodo excepteur eu. Amet minim aliqua in culpa laboris aliqua commodo proident ex reprehenderit Lorem id.

Cupidatat in cillum est veniam ex exercitation culpa minim cillum eu voluptate quis sunt laborum. Nisi id officia proident duis ad nostrud velit ullamco ad consectetur dolore. Lorem ut sint fugiat labore commodo cupidatat id cillum. Enim nisi nostrud culpa officia nulla. Quis tempor ad ipsum laboris veniam culpa mollit ea. Ipsum dolore exercitation labore est anim.
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};
