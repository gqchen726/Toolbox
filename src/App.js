import React from "react";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import {PageH} from "./contains/PageH";
import "./public/css/App.css"


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            
        });
    }
    render() {
        return (
            <ErrorBoundary>
                <PageH />
            </ErrorBoundary>
        );

    }
}
export default App;
