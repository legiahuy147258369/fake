import { Col, Row, Skeleton } from "antd";

import React from 'react'

const Loading = () => {
    return (
        <Row  >
            <Col md={10} sm={0} xs={0}>
                <Skeleton.Input active={true} block={true} style={{ width: '100%', height: 350 }} />
                <div style={{ display: 'flex', gap: 20, marginTop: 20, overflow: 'hidden', justifyContent: 'center' }}>
                    <Skeleton.Image active={true} size={10} />
                    <Skeleton.Image active={true} />
                    <Skeleton.Image active={true} />
                </div>
            </Col>
            <Col className='' lg={14}><Skeleton

                paragraph={{
                    rows: 10,
                }}
            /></Col>
        </Row >
    )
}

export default Loading

