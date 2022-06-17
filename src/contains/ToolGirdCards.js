import React from 'react'
import '../public/css/DataShowGrid.css'
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

import '../public/css/DataShowGrid.css'
import {withRouter} from "react-router";
import {arrayUtils} from "../common/ArrayUtils";
import {RichFooter} from "../component/RichFooter";

export class ToolGirdCards extends React.Component {
    constructor(props) {
        super(props);
    }

    renderAllCardGirds = (datas,currentPage) => {
        if (!datas) return;
        let cardGirds = datas.map((data,index) => {
            return (
                <Card.Grid key={index} className={"GirdOfCard"} >
                    <Link to={{
                        pathname: `/dataInfo/${index}`,
                        // search: `/${index}`,
                    }}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title={data.title} description={data.description} />
                        </Card>
                    </Link>
                </Card.Grid>
            );
        })
        let cardGirdOfSplitPage = [];
        for (let i = 0; i <cardGirds.size(); i++) {
                let page = i / 8;
                cardGirdOfSplitPage[page] = cardGirds[i];
        }

        return cardGirdOfSplitPage[currentPage];
    }

    renderCurrentCardGirds = (datas) => {
        if (!datas) return;
        let cardGirds = datas.map((data,index) => {
            let imgs = arrayUtils.split(data.resources,";");
            let {toolCode} = data;
            return (
                
            <Card.Grid key={index} className={"GirdOfCard"} >
                <RichFooter tool={data} />
            </Card.Grid>
            );
        })

        return cardGirds;
    }


    render() {
        let datas = [
            {
                toolName: 'UUID生成器',
                toolCode: 'UUIDGENERATEOR',
                toolDescription: '这是一个UUID生成器',
                resources: 'https://img2.baidu.com/it/u=2479132908,3302470427&fm=253&fmt=auto&app=138&f=JPG?w=500&h=282'
            }
        ]

        return (
            <Card className={'resultShow'} title={"工具箱"} >
                {
                    this.renderCurrentCardGirds(datas)
                }
                <br /><br /><br /><br />
            </Card>
        );
    }
}
export const ToolGirdCardsW =  withRouter(ToolGirdCards);