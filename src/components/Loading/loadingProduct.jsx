import { Col, Row, Skeleton } from "antd";

import React from 'react';
const LoadingProduct = () => {
    return (
        <Row className="mt-3" >
            <Col md={8} lg={6} xs={12}>
                <Skeleton.Input className="div-img" active={true} block={true} style={{ width: '100%', height: 150 }} />
                <div className="mt-2">
                    <Skeleton active />
                </div>
            </Col>
        </Row >
    )
}

export default LoadingProduct