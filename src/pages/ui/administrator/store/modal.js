import React from "react";
import {Form, Input, Modal, Select} from "antd";
import {backend_url} from "../../../../config/httpRequest1";
import {checkTokenExpiration, get} from "../../../../request";

const { Option } = Select;

const enterpriseUrl = backend_url + 'enterprise/';

class StoreModal extends React.Component{

    state = {
        enterpriseList: []
    };

    componentDidMount() {
        /*
        axios({
            method: 'get',
            url: enterpriseUrl
        }).then(function (res) {
            const enterpriseList = [];
            for (let enterpriseVO of res.data.data) {
                const { enterpriseId, name } = enterpriseVO;
                enterpriseList.push({ enterpriseId, name });
            }
            this.setState({ enterpriseList })
        }.bind(this)).catch(function (err) {
            console.log(err)
        });

         */
        get(enterpriseUrl).then(function (res) {
            if (checkTokenExpiration(res, this.props.getHistory()))
                return;
            const enterpriseList = [];
            for (let enterpriseVO of res.data) {
                const { enterpriseId, name, enable } = enterpriseVO;
                if (enable === 1)
                    enterpriseList.push({ enterpriseId, name, key: enterpriseId });
            }
            this.setState({ enterpriseList, searchLoading: false })
        }.bind(this)).catch(function (err) {
            console.log(err);
        });
    }

    checkEnterprise = (rule, value, callback) => {
        if (value === 0)
            callback('请选择所属企业');
        else
            callback();
    };

    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { handleOk } = this.props;
                handleOk(values);
            }
        })
    };

    render() {
        const { enterpriseList } = this.state;
        const { title, edit, handleCancel, confirmLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
        };
        const name = edit ? this.props.name : '';
        const enterpriseId = edit ? this.props.enterpriseId : 0;
        const enterpriseOptions = enterpriseList.map(enterprise => (
            <Option value={enterprise['enterpriseId']} key={enterprise['enterpriseId']}>{enterprise['name']}</Option>
        ));
        return (
            <Modal
                title={title}
                visible={true}
                onOk={this.handleOk}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
            >
                <Form {...formItemLayout}>
                    {edit ? (
                        <Form.Item label={'仓库id'}>
                            <Input value={this.props.storeId} disabled />
                        </Form.Item>
                    ) : null}
                    <Form.Item label="仓库名称">
                        {getFieldDecorator('name', {
                            initialValue: name,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入仓库名称!',
                                },
                            ],
                        })(<Input placeholder="请保证仓库名称的唯一性" />)}
                    </Form.Item>
                    <Form.Item label="所属企业">
                        {getFieldDecorator('enterpriseId', {
                            initialValue: enterpriseId,
                            rules: [
                                { validator: this.checkEnterprise }
                            ],
                        })(<Select style={{ width: 150 }}>
                            <Option value={0}>--选择企业--</Option>
                            {enterpriseOptions}
                        </Select>)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(StoreModal);
