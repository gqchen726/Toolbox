import {HashRouter} from "react-router-dom";
import {MyRouterWithHook} from './MyRouterWithHook'
import React from "react";
import { Layout } from 'antd';
import './../public/css/PageH.css'
import {MyPrompt} from "../component/MyPrompt";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {
    Anchor,
    Nav,
    Menu,
} from 'grommet';
import {
    BarsOutlined, HddOutlined, PlusSquareOutlined,
} from '@ant-design/icons';
import { ToolGirdCardsW } from "./ToolGirdCards";
import {Home, OrderedList} from "grommet-icons/es6";
export class PageH extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lineMode: false,
            lightTheme: true,
            keywords:null,
            collapsed: false,
            menuItems: [
                {
                    label: "init1"
                },
                {
                    label: "init2"
                },

            ],
            fontStyle: {fontSize:"18px",fontWeight:600,color:"#7d4acf"}
        };

    }


    renderRoutes = () => {
        return (
            <MyRouterWithHook />
        );
    }

    
    renderMenuItems = () => {
        const {fontStyle} = this.state;
        axios.get(urlsUtil.product.searchProductCategoryList).then((response) => {
            let data = response.data;
            let menuItems = null;
            if (data.code == 0) {
                menuItems = data.body.map((value,index) => {
                    return (
                        {
                            label: <span style={fontStyle}>{value}</span>,
                            href: `/#/searchResult/${value}`,
                        }
                    );
                })
            }
            let oldMenuItems = this.state.menuItems;
            if (oldMenuItems != menuItems) {
                setTimeout(() => {
                    this.setState({
                        menuItems: menuItems
                    });
                },0)
            }
        })
    }




    renderLayout = () => {
        const { Header, Content, Footer} = Layout;
        const {fontStyle} = this.state;
        return (
            <Layout className="layout"
            >
                <Header background="light-4" pad="small">
                    <Nav direction="row">
                        <Anchor label={<span style={fontStyle}>首页</span>} href="/#/home" icon={<Home />} />

                        <span style={fontStyle}>
                            <BarsOutlined />
                            <Menu
                                dropProps={{
                                    align: { top: 'bottom', left: 'left' },
                                    elevation: 'xlarge',
                                }}
                                label={<span style={fontStyle}>工具分类</span>}
                                // items={menuItems}
                            />
                        </span>
                        
                    </Nav>
                </Header>
                
                <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                    <div className="site-layout-content">
                        {this.renderRoutes()}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Tianyuge ©2022 Created by GuoqingChen</Footer>
            </Layout>
        );
    }
    

    render () {
        return (
            <HashRouter>
                {/*路由拦截*/}
                <MyPrompt />
                {this.renderLayout()}
            </HashRouter>
        )
    }
}

