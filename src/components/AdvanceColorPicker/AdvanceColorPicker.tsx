import React, { useEffect } from 'react';
import { cyan, generate, green, presetPalettes, red } from '@ant-design/colors';
import { Col, ColorPicker, Divider, Row, theme } from 'antd';
import type { ColorPickerProps } from 'antd';

type Presets = Required<ColorPickerProps>['presets'][number];

const genPresets = (presets = presetPalettes) =>
    Object.entries(presets).map<Presets>(([label, colors]) => ({
        label,
        colors,
    }));

type AdvanceColorPickerProps = ColorPickerProps & {
    showPicker?: boolean;
};

// TODO: Add more color presets

export const AdvanceColorPicker: React.FC<AdvanceColorPickerProps> = (props) =>
{
    const { showPicker = true, ...rest } = props;
    const { token } = theme.useToken();

    const presets = genPresets({
        primary: generate(token.colorPrimary),
        red,
        green,
        cyan,
    });

    const customPanelRender: ColorPickerProps['panelRender'] = (
        _,
        { components: { Picker, Presets } },
    ) => (
        <Row
            justify="space-between"
            wrap={false}
        >
            <Row>
                <Presets />
            </Row>
            {showPicker && (
                <>
                    <Divider
                        type="vertical"
                        style={{ height: 'auto' }}
                    />

                    <Col flex="auto">
                        <Picker />
                    </Col>
                </>
            )}
        </Row>
    );

    useEffect(() =>
    {

    }, []);

    return (
        <ColorPicker
            styles={{ popupOverlayInner: { width: 600 } }}
            presets={presets}
            panelRender={customPanelRender}
            {...rest}
        />
    );
};
