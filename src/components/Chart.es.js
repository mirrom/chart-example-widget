import React from 'react';

import {LineChartRenderer} from "./Renderer/LineChartRenderer.es";


export const Chart = (props) => {

    return (
        <LineChartRenderer {...props} />
    );

}
