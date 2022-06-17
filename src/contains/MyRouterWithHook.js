import React from 'react';
import {
    Route,
    Switch,
    useParams
} from "react-router";
import {Home} from "./Home";
import {ToolGirdCardsW} from './ToolGirdCards'
import Button from "antd/es/button";
import {MyResult} from "../component/MyResult";
// 学习不使用es6编写react组件
// 编写函数组件而不是类组件
// 学习Hook钩子函数的使用useHistory();
export const MyRouterWithHook = (props) => {


    const params = useParams();



    let renderResultPage = (statusCode) => {
        let props = {
            extra: <Button type="primary">返回首页</Button>
        };
        switch (statusCode) {
            case 404 :
                props.status = "404";
                props.title = "404";
                props.subTitle = "抱歉, 您访问的页面不存在.";
                return <MyResult props={props} />;
            case 403 :
                props.status = "403";
                props.title = "403";
                props.subTitle = "抱歉, 您没有权限访问此页面.";
                return <MyResult />;
            case 500 :
                props.status = "500";
                props.title = "500";
                props.subTitle = "抱歉, 服务器发生错误.";
                return <MyResult />;
        }
    }



    return (
        <div className="site-layout-background" style={{padding: 24, textAlign: 'center'}}>
            <Switch>
                <Route exact path='/'>
                    <ToolGirdCardsW />
                </Route>
                <Route exact path='/home'>
                    <ToolGirdCardsW />
                </Route>
                <Route exact path='/all_tools'>
                    <ToolGirdCardsW />
                </Route>
            </Switch>

        </div>
    );


}