import React from 'react';

import {MyRouterWithHook} from "./MyRouterWithHook";

export class MyRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keywords:null,
        }

    }

    
    

    render() {
        return <MyRouterWithHook />
    }
}