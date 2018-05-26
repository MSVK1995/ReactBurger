import React, { Component } from 'react';
import Aux from '../_Aux/aux';
import Modal from '../../components/UI/Modal/Modal';

const errorHandler = (WrappedComponent, axios) => {
    return (class extends Component {
        state = {
            errorMsg: null,
            isError: false            
        };

        componentWillMount() {

            this.requestConfig = axios.interceptors.request.use(req =>{
                this.setState({errorMsg: null, isError: false});
                return req;
            });
            this.responseConfig = axios.interceptors.response.use(res =>res, error =>{
                this.setState({errorMsg: error, isError: true});
                console.log(this.state.errorMsg.message);
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestConfig);
            axios.interceptors.response.eject(this.responseConfig);
        }

        errorConfirmedHandler = () =>{
            this.setState({
                errorMsg: null,
                isError: false
            });
        }
        render(){
            return (
                <Aux>
                    <Modal 
                        show = {this.state.isError}
                        modalClosed = {this.errorConfirmedHandler}>
                        {this.state.errorMsg ? this.state.errorMsg.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    })
}

export default errorHandler;