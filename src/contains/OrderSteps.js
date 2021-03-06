import { Steps } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import React from "react";
import Card from "antd/es/card";
import Button from "antd/es/button";
import {MyDescriptions} from "../component/MyDescriptions";
import {withRouter} from "react-router";
import Space from "antd/es/space";
import {MyResult} from "../component/MyResult";
import {Link} from "react-router-dom";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import "./../public/css/OrderStep.css"
const { Step } = Steps;
import {MyDatePicker} from "../component/MyDatePicker";
import {selectOneProduct} from "../utils/SelectAnProductFromCode";
import {util} from "../common/Util";

export class OrderSteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: {
                GenericOrderStatus: "process",
                ConfirmStatus: "wait",
                Done: "wait"
            },
            productNum: 1,
            orderGenerate: {},
        }
    }

    componentWillMount() {
        if (!!this.props.match.params.key) {
            let productCode = this.props.match.params.key
            selectOneProduct(productCode).then(
                (response) => {
                    let product = response.data.body;
                    this.setState({
                        product: product
                    })
                }
            );
        } else {
            let {orderId} = this.props.match.params;
            axios.get(`${urlsUtil.order.getOrderUrl}?orderId=${orderId}`).then((response) => {
                let {data} = response;
                if (data.code == 0) {
                    let order = data.body;
                    this.setState({
                        orderGenerate:order,
                        status: {
                            GenericOrderStatus: "done",
                            ConfirmStatus: "done",
                            Done: "finish"
                        },
                    })
                } else {
                    util.tipMessage('orderDetail tips',data.message)
                }
            })
        }


    }


    previous = () => {
        let {status} = this.state;
        if ("process" == status.GenericOrderStatus) {
            return ;
        }
        if ("process" == status.Done) {
            return ;
        }
        if ("process" == status.ConfirmStatus) {
            status.GenericOrderStatus = "process";
            status.ConfirmStatus = "wait";
            this.setState({
                status: status
            })
        }
    }


    next = () => {
        let {status, productNum, orderGenerate} = this.state;
        let {datas, user} = this.props;
        // let {key} = this.props.match.params
        // let data = datas[key];
        let data = this.state.product;
        if ("process" == status.GenericOrderStatus) {
            //???????????????????????????,???????????????????????????????????????state
            orderGenerate.productCode = data.productCode;
            orderGenerate.productNum = productNum;
            orderGenerate.mobileNumber = user.mobileNumber;
            if (!orderGenerate.date) {
                util.tipMessage("??????????????????","?????????????????????")
                return ;
            }
            axios.post(urlsUtil.order.genericOrderUrl,orderGenerate).then((response) => {
                if (response.data.code == 0) {
                    let orderGenerate = response.data.body;
                    status.GenericOrderStatus = "finish";
                    status.ConfirmStatus = "process";
                    setTimeout(() => {
                        this.setState({
                            orderGenerate: orderGenerate,
                            status: status,
                        })
                    },0)
                } else {
                    util.tipMessage('order tips',data.message)
                }
            });

            // // ??????????????????
            // let order = {
            //     order: {
            //         orderCode: "TL10000001",
            //         status: "?????????",
            //         totalPrice: data.price * productNum,
            //         generationYTime: new Date().toString(),
            //         User_id: user.mobileNumber,
            //         startTime: new Date().toString(),
            //         endTime: new Date(7).toString(),
            //         productId: data.id
            //     },
            //     product: data,
            // }

           /* status.GenericOrderStatus = "finish";
            status.ConfirmStatus = "process";
            this.setState({
                status: status,
                // orderGenerate: order,
            })
            return ;*/
        }
        if ("process" == status.Done) {
            return ;
        }
        if ("process" == status.ConfirmStatus) {

            status.ConfirmStatus = "finish";
            status.Done = "finish";
            axios.get(`${urlsUtil.order.updateOrderStatus}?mobileNumber=${this.props.user.mobileNumber}&orderId=${orderGenerate.order.orderId}&status=confirmed`)
                .then((response) => {
                    let {code} = response.data;
                    if (code === "0") {
                        this.setState({
                            status: status,
                            orderGenerate: orderGenerate
                        })
                    } else {
                        util.tipMessage('paid tips',data.message)
                    }
                })

        }
    }
    reduce = () => {
        let {productNum} = this.state;
        if(productNum > 0) {
            productNum--
        }
        this.setState({
            productNum: productNum,
        })
    }
    plus = () => {
        let {productNum} = this.state;
        productNum++;
        this.setState({
            productNum: productNum,
        })
    }
    saveReservationDate = (date, dateString) => {
        this.state.orderGenerate.date = dateString;
    }

    returnOrderCard = (productNum, product, status, orderGenerate) => {
        let data = product;
        // let {orderGenerate} = this.state;
        if (!data) {
            return ;
        }
        if (status.GenericOrderStatus == "process") {
            return (
                <Space direction={"vertical"} size={"small"} align={"center"}>
                    <MyDescriptions
                        title={"????????????"}
                        layout={"horizontal"}
                        bordered={true}
                        // columns={columns}
                        descriptered={data}
                        isAdminSpecific={true}
                        isEditMode={this.state.isEditMode}
                    />
                    <br />
                    {/*<span>????????????:</span>*/}
                    {/*<DatePicker*/}
                    {/*    format="YYYY-MM-DD HH:mm:ss"*/}
                    {/*    disabledDate={disabledDate}*/}
                    {/*    disabledTime={disabledDateTime}*/}
                    {/*    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}*/}
                    {/*/>*/}
                    <MyDatePicker title={"????????????:"} onClickHandler={this.saveReservationDate} fromToday={true} />
                    <br />
                    <Space direction={"horizontal"} size={"small"} align={"center"}>
                        ????????????:
                        <Button
                            style={{width:'3%'}}
                            onClick={this.reduce}
                        >
                            -
                        </Button>
                        {productNum}
                        <Button
                            style={{width:'3%'}}
                            onClick={this.plus}
                        >
                            +
                        </Button>
                    </Space>
                </Space>
            );
        }
        if (status.ConfirmStatus == "process") {

            if (!orderGenerate) return <div>data is null</div>

            return (
                <div>
                    <br />
                    <div className={"OrderCode"}>
                        {
                            orderGenerate.order.orderId ? orderGenerate.order.orderId : null
                        }
                    </div>
                    <div className={"OrderDetail"}>
                        <br />
                        <MyDescriptions
                            descriptered={orderGenerate.order}
                            title={"????????????"}
                            bordered={true}
                            layout={"horizontal"}
                        />
                        <br />
                        <MyDescriptions
                            descriptered={orderGenerate.product}
                            title={"????????????"}
                            bordered={true}
                            layout={"horizontal"}
                        />
                    </div>
                </div>
            );
        }
        if (status.Done == "finish") {
            return (
                <MyResult
                    status="success"
                    title="????????????"
                    extra={
                        [
                            <Button
                                type={"primary"}
                                style={{width:'10%'}}
                                key={"goHome"}
                            >
                                <Link to={'/home'} >
                                    ????????????
                                </Link>
                            </Button>,
                            <Button
                                type={"primary"}
                                style={{width:'10%'}}
                                key={"goOrderList"}
                            >
                                <Link to={`/orderDetail/${orderGenerate.order.orderId}`} >
                                    ??????????????????
                                </Link>
                            </Button>
                        ]
                    }
                />
            );
        }
    }
    render() {
        let {status, productNum, product, orderGenerate} = this.state;
        return (
            <Card>
                <Steps>
                    <Step status={status.GenericOrderStatus}
                          title="????????????"
                          icon={status.GenericOrderStatus == "process" ? <LoadingOutlined /> :<SolutionOutlined />}
                    />
                    <Step status={status.ConfirmStatus}
                          title="????????????"
                          icon={status.ConfirmStatus == "process" ? <LoadingOutlined /> :<UserOutlined />}
                    />
                    <Step status={status.Done}
                          title="????????????"
                          icon={<SmileOutlined />}
                    />
                </Steps>
                {/*1.??????????????????*/}
                {/*2.????????????*/}
                {/*3.??????????????????*/}
                {
                    this.returnOrderCard(productNum, product, status, orderGenerate)
                }
                {
                    status.Done === "finish" ? null: (
                        <div>
                            {
                                status.ConfirmStatus == "process"?
                                    (
                                        <Button
                                            type={"primary"}
                                            onClick={this.previous}
                                        >
                                            ??????????????????
                                        </Button>
                                    ): null
                            }
                            &nbsp;
                            <Button
                                type={"primary"}
                                onClick={this.next}
                            >
                                {status.GenericOrderStatus == "process" ? "????????????" : "????????????????????????"}
                            </Button>
                        </div>
                    )
                }
            </Card>
        );
    }
}
export const OrderStepsW = withRouter(OrderSteps)
OrderSteps.defaultProps = {
    status: {
        GenericOrderStatus: "process",
        ConfirmStatus: "wait",
        Done: "wait"
    }
}