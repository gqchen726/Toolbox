import React from 'react';

import {
    Anchor,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Collapsible,
    Grommet,
    Paragraph,
} from 'grommet';

import { FormDown, FormUp, Favorite, ShareOption } from 'grommet-icons';
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {Image} from "grommet/es6";
import axios from "axios";
import {util} from "../common/Util";

const theme = {
    global: {
        font: {
            family: `Comic Sans MS, -apple-system,
         BlinkMacSystemFont, 
         "Segoe UI", 
         Roboto`,
        },
    },
    card: {
        elevation: 'none',
        background: 'light-2',
        footer: {
            pad: 'medium',
        },
    },
};

export class RichFooter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            favorite: false,
        }
    }

    setOpen = (open) => {
        this.setState({
            open: open
        })
    }

    componentWillMount() {
        // axios.get(`${urlsUtil.collection.getAllCollection}?mobileNumber=${this.props.user.mobileNumber}`).then((response) => {
        //     let body = response.data.body;
        //     body.map((collection) => {
        //         if (collection.toolCode === this.props.tool.toolCode) {
        //             setTimeout(() => {
        //                 this.setState({
        //                     favorite:true
        //                 })
        //             },0)
        //         }
        //     })
        // })
    }

    // setFavorite = (favorite,toolCode) => {
    //     if (!this.props.user) util.tipMessage("收藏提示","您未登录，请先登陆后重试")
    //     let url = favorite ? urlsUtil.collection.addCollection:urlsUtil.collection.deleteCollection;
    //     axios.post(url,{toolCode:toolCode,mobileNumber:this.props.user.mobileNumber}).then(res => {
    //         if (res.data.code) {
    //             setTimeout(() => {
    //                 this.setState({
    //                     favorite: favorite
    //                 })
    //             },0)
    //         }
    //         util.tipMessage("收藏提示",res.data.message)
    //     }).catch( err => {
    //         util.tipMessage("收藏提示",err)
    //     })
    // }


    render() {
        let {favorite, open} = this.state;
        let {tool} = this.props;
        const Icon = open ? FormUp : FormDown;
        const rows = 5;
        const expandable = false;
        const ellipsis = true;
        return (
            <Grommet theme={theme}>
                <Box pad="medium" align="start">
                    <Card elevation="large" width="medium">
                        <CardBody height={{"min": "0px", "max": "183px"}}>
                            
                            <Image
                                key={tool.toolCode}
                                src={tool.resources}
                                fill={true}
                                fit="cover"
                                alignSelf='center'
                            />
                        </CardBody>
                        <Box pad={{ horizontal: 'medium' }} responsive={false}>

                            
                            <br />
                            <Paragraph margin={{ top: 'none' }}>
                                {tool.toolName}
                            </Paragraph>
                        </Box>
                        <CardFooter>
                            <Box direction="row" align="center" gap="small">
                                {/* <Button
                                    icon={<Favorite color={favorite ? 'red' : undefined} />}
                                    hoverIndicator
                                    onClick={() => this.setFavorite(!favorite,tool.toolCode)}
                                /> */}
                                <Anchor
                                    href={`/#/dataInfo/${tool.toolCode}`}
                                    label="See More"
                                />
                            </Box>
                            
                        </CardFooter>
                        <Collapsible open={open}>
                            <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                                {tool.toolDescription}
                            </Paragraph>
                        </Collapsible>
                    </Card>
                </Box>
            </Grommet>
        );
    }

}