import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.es';


export default function main({portletNamespace, contextPath, portletElementId, configuration}) {

    console.log("Loading " + portletElementId);
    ReactDOM.render(
        <App portletNamespace={portletNamespace} contextPath={contextPath} portletElementId={portletElementId}
            configuration={configuration} />,
        document.getElementById(portletElementId));

    Liferay.once('destroyPortlet', () => {
        console.log("Unmounting " + portletElementId);
        ReactDOM.unmountComponentAtNode(document.getElementById(portletElementId));
    });

}
